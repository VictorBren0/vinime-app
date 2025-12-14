import * as Notifications from 'expo-notifications';
import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});
export function useNotification() {
    const navigation = useNavigation();

    // const notificationListener = useRef<Notifications.EventSubscription | undefined>(undefined);
    const responseListener = useRef<Notifications.EventSubscription | undefined>(undefined);

    useEffect(() => {
        registerForPushNotificationsAsync()//.then(token => setExpoPushToken(token));

        // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        //     setNotification(notification);
        // });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('Notificação tocada:', response);

            const data = response.notification.request.content.data;
            
            // Navegar para detalhes do anime quando tocar na notificação
            if (data?.animeId) {
                navigation.navigate('Details' as never, { animeId: data.animeId } as never);
            } else if (data?.productId) {
                navigation.navigate('Details' as never, { id: data.productId } as never);
            }
        });

        return () => {
            // if (notificationListener.current) notificationListener.current.remove();
            if (responseListener.current) responseListener.current.remove();
        };
    }, []);
}

async function registerForPushNotificationsAsync(): Promise<string | undefined> {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            alert('Falha ao obter permissão para push token!');
            return;
        }

        const responseExpo = await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig?.extra?.eas?.projectId,
        });

        token = responseExpo.data;

        console.log("Token notification:", token);
    } else {
        console.log('Use um dispositivo físico para Notificações Push');
    }

    return token;
}