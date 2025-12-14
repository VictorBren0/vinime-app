import React from "react";
import { ScrollView, ActivityIndicator, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/client/react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { GET_ANIME_DETAILS } from "@/queries/animeQueries";
import { addToFavorites, removeFromFavorites } from "@/store/slices/animeSlice";
import { RootState, AppDispatch } from "@/store";
import * as Notifications from 'expo-notifications';

export default function Details() {
    const route = useRoute();
    const navigation = useNavigation();
    const { animeId } = route.params as { animeId: number };
    const dispatch = useDispatch<AppDispatch>();
    const favorites = useSelector((state: RootState) => state.anime.favorites);
    const authUser = useSelector((state: RootState) => state.auth.user);
    const isFavorite = favorites.some((a) => a.id === animeId);

    const { loading, error, data } = useQuery(GET_ANIME_DETAILS, {
        variables: { id: animeId },
    });

    if (loading) {
        return (
            <Center className="flex-1 bg-background-0 dark:bg-background-0">
                <ActivityIndicator size="large" color="#A855F7" />
            </Center>
        );
    }

    if (error) {
        return (
            <Center className="flex-1 bg-background-0 dark:bg-background-0 px-6">
                <Text className="text-error-500 text-center mb-3 font-semibold">
                    Erro ao carregar detalhes
                </Text>
                <Text className="text-typography-500 dark:text-typography-400 text-xs text-center mb-4">
                    Algo deu errado ao buscar as informações deste anime. Tente
                    novamente.
                </Text>
                <Button
                    onPress={() => navigation.goBack()}
                    className="mt-1 rounded-full bg-primary-500"
                    size="lg"
                >
                    <ButtonText className="font-semibold text-white">
                        Voltar
                    </ButtonText>
                </Button>
            </Center>
        );
    }

    const anime = data?.Media;

    const handleToggleFavorite = async () => {
        if (!authUser) {
            Alert.alert(
                "Erro",
                "Você precisa estar logado para adicionar favoritos"
            );
            return;
        }

        if (!anime) return;

        try {
            const animeTitle = anime.title.english || anime.title.romaji;
            
            if (isFavorite) {
                await dispatch(
                    removeFromFavorites({
                        userId: authUser.uid,
                        animeId: anime.id,
                    })
                ).unwrap();
                
                // Notificação ao remover dos favoritos
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: 'Removido dos Favoritos 💔',
                        body: `${animeTitle} foi removido da sua lista`,
                        data: { animeId: anime.id, action: 'removed' },
                        sound: true,
                    },
                    trigger: null,
                });
            } else {
                await dispatch(
                    addToFavorites({
                        userId: authUser.uid,
                        anime: {
                            id: anime.id,
                            title: {
                                romaji: anime.title.romaji || "",
                                english: anime.title.english || "",
                                native: anime.title.native || "",
                            },
                            coverImage: {
                                large:
                                    anime.coverImage.extraLarge ||
                                    anime.coverImage.large ||
                                    "",
                            },
                            description: anime.description || "",
                        },
                    })
                ).unwrap();
                
                // Notificação ao adicionar aos favoritos
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: '✨ Adicionado aos Favoritos!',
                        body: `${animeTitle} agora está na sua lista`,
                        data: { animeId: anime.id, action: 'added' },
                        sound: true,
                    },
                    trigger: null,
                });
            }
        } catch (error) {
            Alert.alert("Erro", "Não foi possível atualizar sua lista");
        }
    };

    return (
        <Box className="flex-1 bg-background-0 dark:bg-background-0">
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                {anime.bannerImage && (
                    <Box className="relative">
                        <Image
                            source={{ uri: anime.bannerImage }}
                            alt="Banner"
                            className="w-full h-64 object-cover"
                            resizeMode="cover"
                        />
                        <Box className="absolute inset-0 bg-background-950/50 dark:bg-background-0/40" />
                        <Box className="absolute inset-0 bg-gradient-to-t from-background-0 via-background-0/70 to-transparent" />
                    </Box>
                )}
                <Box className="px-4 -mt-20">
                    <HStack className="space-x-4 items-end mb-6">
                        <Image
                            source={{ uri: anime.coverImage.extraLarge }}
                            alt="Cover"
                            className="w-28 h-40 rounded-sm"
                            resizeMode="cover"
                        />
                        <VStack className="flex-1 pb-2 pl-3">
                            <Text
                                className="text-2xl font-bold leading-tight"
                                numberOfLines={3}
                            >
                                {anime.title.english || anime.title.romaji}
                            </Text>
                            <Text className="text-typography-400 dark:text-typography-400 text-sm mt-2">
                                {anime.startDate?.year} • {anime.episodes} eps •{" "}
                                {anime.averageScore}%
                            </Text>
                        </VStack>
                    </HStack>

                    <Button
                        onPress={handleToggleFavorite}
                        className="mb-6 rounded-full bg-primary-500"
                        size="lg"
                    >
                        <ButtonText className="font-semibold text-white">
                            {isFavorite
                                ? "Remover da Minha Lista"
                                : "Adicionar à Minha Lista"}
                        </ButtonText>
                    </Button>

                    <VStack className="space-y-5">
                        <Box>
                            <Text className="text-base leading-6">
                                {anime.description?.replace(/<[^>]+>/g, "")}
                            </Text>
                        </Box>

                        <Box>
                            <Text className="text-typography-500 dark:text-typography-400 text-sm mb-3 mt-4">
                                Generos:
                            </Text>
                            <HStack className="flex-wrap gap-2">
                                {anime.genres?.map((genre: string) => (
                                    <Box
                                        key={genre}
                                        className="bg-background-50 dark:bg-background-50/10 px-3 py-1.5 rounded-full"
                                        style={{
                                            borderWidth: 1,
                                            borderColor:
                                                "rgba(147, 51, 234, 0.35)",
                                        }}
                                    >
                                        <Text className="text-typography-700 dark:text-typography-100 text-xs">
                                            {genre}
                                        </Text>
                                    </Box>
                                ))}
                            </HStack>
                        </Box>
                    </VStack>
                </Box>
            </ScrollView>
        </Box>
    );
}
