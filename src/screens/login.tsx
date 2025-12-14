import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "@/store/slices/authSlice";
import { AppDispatch, RootState } from "@/store";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<any>();
    const { isLoading, error } = useSelector((state: RootState) => state.auth);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Erro", "Preencha todos os campos");
            return;
        }

        try {
            await dispatch(login({ email, password })).unwrap();
            navigation.reset({
                index: 0,
                routes: [{ name: "Main" }],
            });
        } catch (error: any) {
            Alert.alert("Erro", error || "Erro ao fazer login");
        }
    };

    const goToSignup = () => {
        dispatch(clearError());
        navigation.navigate("Signup");
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 bg-gray-900"
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View className="flex-1 justify-center px-6">
                    <View className="mb-10">
                        <Text className="text-4xl font-bold text-white text-center mb-2">
                            VinimeApp
                        </Text>
                        <Text className="text-gray-400 text-center text-base">
                            Entre para continuar
                        </Text>
                    </View>

                    <View className="space-y-4">
                        <View>
                            <Text className="text-white text-sm font-medium mb-2">
                                E-mail
                            </Text>
                            <TextInput
                                className="bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700"
                                placeholder="seu@email.com"
                                placeholderTextColor="#9CA3AF"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                editable={!isLoading}
                            />
                        </View>

                        <View className="mt-4">
                            <Text className="text-white text-sm font-medium mb-2">
                                Senha
                            </Text>
                            <TextInput
                                className="bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700"
                                placeholder="••••••••"
                                placeholderTextColor="#9CA3AF"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                editable={!isLoading}
                            />
                        </View>

                        {error && (
                            <View className="bg-red-500/10 border border-red-500 rounded-lg p-3 mt-2">
                                <Text className="text-red-500 text-sm text-center">
                                    {error}
                                </Text>
                            </View>
                        )}

                        <TouchableOpacity
                            className={`bg-purple-600 py-4 rounded-lg mt-6 ${
                                isLoading ? "opacity-50" : ""
                            }`}
                            onPress={handleLogin}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text className="text-white text-center text-base font-semibold">
                                    Entrar
                                </Text>
                            )}
                        </TouchableOpacity>

                        <View className="flex-row justify-center mt-6">
                            <Text className="text-gray-400 text-sm">
                                Não tem uma conta?{" "}
                            </Text>
                            <TouchableOpacity
                                onPress={goToSignup}
                                disabled={isLoading}
                            >
                                <Text className="text-purple-500 text-sm font-semibold">
                                    Cadastre-se
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
