
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./tabs";
import Details from "@/screens/details";
import Login from "@/screens/login";
import Signup from "@/screens/signup";
import { useColorScheme } from "@/components/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { View, ActivityIndicator } from "react-native";

const Stack = createNativeStackNavigator();

export default function Routes() {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? "light"];
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [isLoading, setIsLoading] = useState(true);

    // Verifica estado de autenticação ao iniciar
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: themeColors.background }}>
                <ActivityIndicator size="large" color={themeColors.tint} />
            </View>
        );
    }

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {!isAuthenticated ? (
                <>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Signup" component={Signup} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Main" component={Tabs} />
                    <Stack.Screen
                        name="Details"
                        component={Details}
                        options={{
                            headerShown: true,
                            title: 'Detalhes do Anime',
                            headerStyle: {
                                backgroundColor: themeColors.background,
                            },
                            headerTintColor: themeColors.text,
                            headerShadowVisible: false,
                        }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
}
