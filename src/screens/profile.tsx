import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toggleTheme, saveTheme } from '@/store/slices/userSlice';
import { RootState, AppDispatch } from '@/store';
import { logout } from '@/store/slices/authSlice';

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const authUser = useSelector((state: RootState) => state.auth.user);
  
  const isDark = user.theme === 'dark';

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
    const newTheme = user.theme === 'dark' ? 'light' : 'dark';
    dispatch(saveTheme(newTheme));
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair da Conta',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(logout()).unwrap();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível fazer logout');
            }
          }
        }
      ]
    );
  };

  const MenuItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    rightElement 
  }: { 
    icon?: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
  }) => (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <Box style={{ 
        backgroundColor: isDark ? '#1a1a1a' : '#f9fafb',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 12,
        marginBottom: 12
      }}>
        <HStack className="justify-between items-center">
          <VStack className="flex-1">
            <Text style={{ fontSize: 16, fontWeight: '600', color: isDark ? '#f9fafb' : '#111827' }}>
              {title}
            </Text>
            {subtitle && (
              <Text style={{ fontSize: 14, color: isDark ? '#9ca3af' : '#6b7280', marginTop: 4 }}>
                {subtitle}
              </Text>
            )}
          </VStack>
          {rightElement && (
            <Box className="ml-4">
              {rightElement}
            </Box>
          )}
        </HStack>
      </Box>
    </TouchableOpacity>
  );

  return (
    <Box style={{ flex: 1, backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack className="px-5 py-6 space-y-6">
        
        <Box className="items-center py-6">
          <Box style={{ 
            width: 96, 
            height: 96, 
            borderRadius: 48, 
            backgroundColor: isDark ? '#8b5cf6' : '#7c3aed',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16
          }}>
            <Text className="text-4xl font-bold text-white">
              {authUser?.displayName?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </Box>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: isDark ? '#f9fafb' : '#111827' }}>
            {authUser?.displayName || 'Usuário'}
          </Text>
          <Text style={{ fontSize: 14, color: isDark ? '#9ca3af' : '#6b7280', marginTop: 4 }}>
            {authUser?.email || 'email@exemplo.com'}
          </Text>
        </Box>

        <VStack className="space-y-2">
          <Text style={{ 
            fontSize: 12, 
            fontWeight: '600', 
            color: isDark ? '#9ca3af' : '#6b7280',
            textTransform: 'uppercase',
            letterSpacing: 1,
            marginBottom: 8,
            paddingLeft: 4
          }}>
            Preferências
          </Text>
          
          <MenuItem
            title="Modo Escuro"
            subtitle={user.theme === 'dark' ? 'Ativado' : 'Desativado'}
            rightElement={
              <Switch
                value={user.theme === 'dark'}
                onValueChange={handleThemeToggle}
              />
            }
          />

        </VStack>

        <VStack className="space-y-2">
          <Text style={{ 
            fontSize: 12, 
            fontWeight: '600', 
            color: isDark ? '#9ca3af' : '#6b7280',
            textTransform: 'uppercase',
            letterSpacing: 1,
            marginBottom: 8,
            paddingLeft: 4
          }}>
            Informações
          </Text>

          <MenuItem
            title="Sobre"
            subtitle="Versão 1.0.0"
            onPress={() => Alert.alert('VinimeApp', 'Versão 1.0.0\n\nSeu app de animes favorito!')}
            rightElement={
              <Text style={{ color: isDark ? '#6b7280' : '#9ca3af', fontSize: 18 }}>›</Text>
            }
          />
        </VStack>

        <Box className="pt-4 pb-8">
          <Button
            onPress={handleLogout}
            style={{ 
              borderRadius: 12, 
              backgroundColor: isDark ? '#ef4444' : '#dc2626'
            }}
            size="lg"
          >
            <ButtonText style={{ fontWeight: 'bold', color: '#ffffff', fontSize: 16 }}>
              Sair da Conta
            </ButtonText>
          </Button>
        </Box>

        <Box className="pb-6">
          <Text style={{ textAlign: 'center', color: isDark ? '#6b7280' : '#9ca3af', fontSize: 12 }}>
            VinimeApp © 2025
          </Text>
        </Box>

      </VStack>
      </ScrollView>
    </Box>
  );
}
