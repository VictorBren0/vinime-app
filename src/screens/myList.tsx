import React, { useEffect } from 'react';
import { FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Center } from '@/components/ui/center';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import AnimeCard from '@/components/AnimeCard';
import { RootState, AppDispatch } from '@/store';
import { useNavigation } from '@react-navigation/native';
import { fetchFavorites } from '@/store/slices/animeSlice';
import { Heart, Sparkles } from 'lucide-react-native';

export default function MyList() {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.anime.favorites);
  const authUser = useSelector((state: RootState) => state.auth.user);
  const user = useSelector((state: RootState) => state.user);
  const loading = useSelector((state: RootState) => state.anime.loading);
  const navigation = useNavigation();
  
  const isDark = user.theme === 'dark';
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (authUser) {
      dispatch(fetchFavorites(authUser.uid));
    }
  }, [authUser, dispatch]);

  const onRefresh = React.useCallback(async () => {
    if (authUser) {
      setRefreshing(true);
      await dispatch(fetchFavorites(authUser.uid));
      setRefreshing(false);
    }
  }, [authUser, dispatch]);

  const renderItem = ({ item }: { item: any }) => {
    // Validação extra para evitar erros
    if (!item?.coverImage?.large || !item?.title) {
      console.warn('Anime inválido encontrado:', item);
      return null;
    }
    
    return (
      <Box style={{ flex: 0.5, padding: 6 }}>
        <AnimeCard
          anime={item}
          onPress={() => {
            navigation.navigate('Details' as never, { animeId: item.id } as never);
          }}
        />
      </Box>
    );
  };

  const ListHeader = () => (
    <Box style={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 24 }}>
      <VStack style={{ gap: 16 }}>
        <HStack className="items-center" style={{ gap: 14 }}>
          <Box style={{ 
            backgroundColor: isDark ? '#7c3aed' : '#8b5cf6',
            padding: 12,
            borderRadius: 14
          }}>
            <Heart size={26} color="#ffffff" fill="#ffffff" />
          </Box>
          <VStack className="flex-1">
            <Text style={{ 
              fontSize: 28, 
              fontWeight: 'bold', 
              color: isDark ? '#f9fafb' : '#111827' 
            }}>
              Minha Lista
            </Text>
            <Text style={{ 
              fontSize: 14, 
              color: isDark ? '#9ca3af' : '#6b7280',
              marginTop: 4
            }}>
              {favorites.length} {favorites.length === 1 ? 'anime' : 'animes'} salvos
            </Text>
          </VStack>
        </HStack>
        
        {favorites.length > 0 && (
          <Box style={{ 
            backgroundColor: isDark ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.1)',
            padding: 14,
            borderRadius: 12,
            borderLeftWidth: 3,
            borderLeftColor: isDark ? '#8b5cf6' : '#7c3aed'
          }}>
            <HStack className="items-center" style={{ gap: 10 }}>
              <Sparkles size={16} color={isDark ? '#a78bfa' : '#8b5cf6'} />
              <Text style={{ 
                fontSize: 13, 
                color: isDark ? '#c4b5fd' : '#6d28d9',
                flex: 1,
                lineHeight: 18
              }}>
                Seus animes favoritos estão salvos e sincronizados
              </Text>
            </HStack>
          </Box>
        )}
      </VStack>
    </Box>
  );

  if (loading && !refreshing) {
    return (
      <Box style={{ flex: 1, backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }}>
        <ListHeader />
        <Center className="flex-1">
          <Box style={{ 
            backgroundColor: isDark ? '#1a1a1a' : '#f9fafb',
            padding: 24,
            borderRadius: 20,
            alignItems: 'center'
          }}>
            <ActivityIndicator size="large" color="#8b5cf6" />
            <Text style={{ 
              color: isDark ? '#9ca3af' : '#6b7280',
              fontSize: 14,
              marginTop: 16
            }}>
              Carregando sua lista...
            </Text>
          </Box>
        </Center>
      </Box>
    );
  }

  if (!authUser) {
    return (
      <Box style={{ flex: 1, backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }}>
        <Box style={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 16 }}>
          <HStack className="items-center space-x-3">
            <Box style={{ 
              backgroundColor: isDark ? '#7c3aed' : '#8b5cf6',
              padding: 10,
              borderRadius: 12
            }}>
              <Heart size={24} color="#ffffff" />
            </Box>
            <Text style={{ 
              fontSize: 28, 
              fontWeight: 'bold', 
              color: isDark ? '#f9fafb' : '#111827' 
            }}>
              Minha Lista
            </Text>
          </HStack>
        </Box>
        <Center className="flex-1 px-8">
          <Box style={{
            backgroundColor: isDark ? '#1a1a1a' : '#f9fafb',
            padding: 32,
            borderRadius: 20,
            alignItems: 'center',
            width: '100%'
          }}>
            <Box style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.15)',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20
            }}>
              <Heart size={40} color={isDark ? '#8b5cf6' : '#7c3aed'} />
            </Box>
            <Text style={{ 
              color: isDark ? '#f9fafb' : '#111827',
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 8
            }}>
              Login Necessário
            </Text>
            <Text style={{ 
              color: isDark ? '#9ca3af' : '#6b7280',
              fontSize: 14,
              textAlign: 'center'
            }}>
              Faça login para salvar e visualizar seus animes favoritos
            </Text>
          </Box>
        </Center>
      </Box>
    );
  }

  if (favorites.length === 0) {
    return (
      <Box style={{ flex: 1, backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }}>
        <ListHeader />
        <Center className="flex-1 px-8">
          <Box style={{
            backgroundColor: isDark ? '#1a1a1a' : '#f9fafb',
            padding: 32,
            borderRadius: 20,
            alignItems: 'center',
            width: '100%'
          }}>
            <Box style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.15)',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20
            }}>
              <Heart size={40} color={isDark ? '#8b5cf6' : '#7c3aed'} />
            </Box>
            <Text style={{ 
              color: isDark ? '#f9fafb' : '#111827',
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 8
            }}>
              Sua lista está vazia
            </Text>
            <Text style={{ 
              color: isDark ? '#9ca3af' : '#6b7280',
              fontSize: 14,
              textAlign: 'center'
            }}>
              Explore animes e adicione seus favoritos para vê-los aqui!
            </Text>
          </Box>
        </Center>
      </Box>
    );
  }

  return (
    <Box style={{ flex: 1, backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={{ paddingBottom: 32 }}
        columnWrapperStyle={{ paddingHorizontal: 12 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={isDark ? '#8b5cf6' : '#7c3aed'}
            colors={['#8b5cf6']}
          />
        }
      />
    </Box>
  );
}
