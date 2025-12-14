import {
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    useFonts,
} from "@expo-google-fonts/inter";
import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
    ThemeProvider,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar, Alert } from "react-native";
import "react-native-reanimated";
import "../global.css";
import Routes from "@/routes";
import { GluestackUIProvider } from "./components/ui/gluestack-ui-provider";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store, RootState, AppDispatch } from "./store";
import { ApolloProvider } from '@apollo/client/react';
import client from "./services/apollo";
import { useAuthListener } from "./hooks/useAuthListener";
import { loadTheme } from "./store/slices/userSlice";
import { useNotification } from '@/hooks/useNotifications';
import * as Updates from 'expo-updates';

SplashScreen.preventAutoHideAsync();

function AppNavigation() {
    useNotification();
    return <Routes />;
}

function AppContent() {
    const dispatch = useDispatch<AppDispatch>();
    const [fontsLoaded] = useFonts({
        Inter_600SemiBold,
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
    });

    const userTheme = useSelector((state: RootState) => state.user.theme);
    
    // Sincroniza estado de autenticação do Firebase com Redux
    useAuthListener();

    useEffect(() => {
        // Carregar tema salvo ao iniciar
        dispatch(loadTheme());
    }, [dispatch]);

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    // Verificar atualizações OTA com Expo Updates
    useEffect(() => {
        async function checkForUpdates() {
            if (__DEV__) {
                // Não verificar updates em modo desenvolvimento
                return;
            }

            try {
                const update = await Updates.checkForUpdateAsync();
                
                if (update.isAvailable) {
                    await Updates.fetchUpdateAsync();
                    Alert.alert(
                        'Atualização Disponível',
                        'Uma nova versão do app foi baixada. Deseja reiniciar agora?',
                        [
                            {
                                text: 'Depois',
                                style: 'cancel',
                            },
                            {
                                text: 'Reiniciar',
                                onPress: async () => {
                                    await Updates.reloadAsync();
                                },
                            },
                        ]
                    );
                }
            } catch (error) {
                console.error('Erro ao verificar atualizações:', error);
            }
        }

        checkForUpdates();
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <GluestackUIProvider mode={userTheme}>
            <ThemeProvider
                value={userTheme === "dark" ? DarkTheme : DefaultTheme}
            >
                <StatusBar
                    backgroundColor={"transparent"}
                    translucent
                    barStyle={
                        userTheme === "dark" ? "light-content" : "dark-content"
                    }
                />
                <NavigationContainer>
                    <AppNavigation />
                </NavigationContainer>
            </ThemeProvider>
        </GluestackUIProvider>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <ApolloProvider client={client}>
                <AppContent />
            </ApolloProvider>
        </Provider>
    );
}
