import React, { useState } from 'react';
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
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signUp, clearError } from '@/store/slices/authSlice';
import { AppDispatch, RootState } from '@/store';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      await dispatch(
        signUp({
          email,
          password,
          displayName: name,
        })
      ).unwrap();

      // Navega para tela principal após cadastro bem-sucedido
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } catch (error: any) {
      Alert.alert('Erro', error || 'Erro ao criar conta');
    }
  };

  const goToLogin = () => {
    dispatch(clearError());
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-900"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-6 py-8">
          <View className="mb-8">
            <Text className="text-4xl font-bold text-white text-center mb-2">
              VinimeApp
            </Text>
            <Text className="text-gray-400 text-center text-base">
              Crie sua conta
            </Text>
          </View>

          <View className="space-y-4">
            <View>
              <Text className="text-white text-sm font-medium mb-2">
                Nome completo
              </Text>
              <TextInput
                className="bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700"
                placeholder="Seu nome"
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={setName}
                editable={!isLoading}
              />
            </View>

            <View className="mt-4">
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
                placeholder="Mínimo 6 caracteres"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!isLoading}
              />
            </View>

            <View className="mt-4">
              <Text className="text-white text-sm font-medium mb-2">
                Confirmar senha
              </Text>
              <TextInput
                className="bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700"
                placeholder="Digite a senha novamente"
                placeholderTextColor="#9CA3AF"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
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
                isLoading ? 'opacity-50' : ''
              }`}
              onPress={handleSignup}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-center text-base font-semibold">
                  Criar conta
                </Text>
              )}
            </TouchableOpacity>

            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-400 text-sm">
                Já tem uma conta?{' '}
              </Text>
              <TouchableOpacity onPress={goToLogin} disabled={isLoading}>
                <Text className="text-purple-500 text-sm font-semibold">
                  Entre aqui
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
