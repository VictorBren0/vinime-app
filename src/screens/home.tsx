import React, { useEffect, useState } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import { useQuery } from "@apollo/client/react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Search, Moon, Sun, Flame, Sparkles } from "lucide-react-native";
import { GET_ANIME_LIST } from "@/queries/animeQueries";
import { setAnimeList } from "@/store/slices/animeSlice";
import { toggleTheme, saveTheme } from "@/store/slices/userSlice";
import { RootState, AppDispatch } from "@/store";
import AnimeRow from "@/components/AnimeRow";
import HomeBanner from "@/components/HomeBanner";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation();
    const user = useSelector((state: RootState) => state.user);
    const authUser = useSelector((state: RootState) => state.auth.user);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const { loading, error, data, refetch } = useQuery(GET_ANIME_LIST, {
        variables: {
            page: 1,
            perPage: 20,
            search: debouncedSearch || undefined,
        },
    });

    // Debounce para pesquisa
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        if (data?.Page?.media) {
            dispatch(setAnimeList(data.Page.media));
        }
    }, [data, dispatch]);

    const animeList = data?.Page?.media || [];
    const featuredAnime =
        !searchQuery && animeList.length > 0 ? animeList[0] : null;

    // Dividir animes em categorias para layout Netflix
    const popularAnimes = animeList.slice(1, 11);
    const trendingAnimes = animeList.slice(11, 21);
    const searchResults = animeList;

    const handleAnimePress = (animeId: number) => {
        navigation.navigate("Details" as never, { animeId } as never);
    };

    const handleSurpriseMe = () => {
        if (animeList.length > 0) {
            const randomIndex = Math.floor(Math.random() * animeList.length);
            const randomAnime = animeList[randomIndex];
            handleAnimePress(randomAnime.id);
        }
    };

    const SkeletonCard = () => (
        <Box
            className="mr-2 w-32 h-48 rounded-sm overflow-hidden bg-background-50/60 dark:bg-background-50/40"
            style={{ borderWidth: 1, borderColor: "rgba(147, 51, 234, 0.4)" }}
        />
    );

    const HeroHeader = () => (
        <Box className="px-4 pt-10 pb-5 bg-background-0 dark:bg-background-0">
            <HStack className="items-center justify-between mb-4">
                <VStack className="space-y-1">
                    <Text className="text-xs text-typography-500 dark:text-typography-400 uppercase tracking-[2px]">
                        Bem-vindo de volta
                    </Text>
                    <Text className="text-2xl font-extrabold">
                        {authUser?.displayName
                            ? `Olá, ${authUser.displayName}`
                            : "Seu hub de animes"}
                    </Text>
                </VStack>

                <Pressable
                    onPress={() => {
                        dispatch(toggleTheme());
                        const newTheme = user.theme === 'dark' ? 'light' : 'dark';
                        dispatch(saveTheme(newTheme));
                    }}
                    className="p-2 rounded-full items-center justify-center bg-primary-50 dark:bg-primary-100/30"
                >
                    {user.theme === "dark" ? (
                        <Sun size={20} color="#A855F7" />
                    ) : (
                        <Moon size={20} color="#9333EA" />
                    )}
                </Pressable>
            </HStack>

            <HStack className="space-x-3 items-center">
                <Box className="flex-1">
                    <Input
                        className="rounded-full bg-background-50/90 dark:bg-background-50/20"
                        style={{
                            borderWidth: 1,
                            borderColor:
                                user.theme === "dark"
                                    ? "rgba(168, 85, 247, 0.65)"
                                    : "rgba(147, 51, 234, 0.65)",
                        }}
                    >
                        <InputSlot className="pl-3">
                            <InputIcon
                                as={Search}
                                style={{
                                    color:
                                        user.theme === "dark"
                                            ? "#A855F7"
                                            : "#9333EA",
                                }}
                            />
                        </InputSlot>
                        <InputField
                            placeholder="Pesquisar"
                            placeholderTextColor={
                                user.theme === "dark" ? "#A1A1AA" : "#6B7280"
                            }
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            className="text-sm"
                        />
                    </Input>
                </Box>

                {!searchQuery && (
                    <Pressable
                        onPress={handleSurpriseMe}
                        className="px-4 py-2.5 rounded-full flex-row items-center ml-1"
                        style={{
                            backgroundColor:
                                user.theme === "dark" ? "#8b5cf6" : "#7c3aed",
                            shadowColor: "#8b5cf6",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 4,
                            elevation: 3,
                        }}
                    >
                        <Flame size={18} color="#FDE68A" />
                        <Text className="text-white text-xs ml-1.5 font-bold">
                            Surpreenda-me
                        </Text>
                    </Pressable>
                )}
            </HStack>
        </Box>
    );

    if (loading) {
        return (
            <Box className="flex-1 bg-background-0 dark:bg-background-0">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <HeroHeader />
                    <Box className="px-4 mt-4 mb-3">
                        <Box className="w-full h-72 rounded-2xl bg-background-50 dark:bg-background-50/20" />
                    </Box>
                    <Box className="mt-4 mb-2 px-4 flex-row items-center justify-between">
                        <HStack className="items-center space-x-2">
                            <Sparkles size={18} color="#EC4899" />
                            <Text className="text-typography-900 dark:text-typography-50 font-semibold text-base">
                                Carregando recomendações
                            </Text>
                        </HStack>
                        <ActivityIndicator size="small" color="#A855F7" />
                    </Box>
                    <Box className="px-4 flex-row mt-2">
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </Box>
                </ScrollView>
            </Box>
        );
    }

    if (error) {
        return (
            <Box className="flex-1 bg-background-0 dark:bg-background-0">
                <HeroHeader />
                <Center className="flex-1 px-6">
                    <Text className="text-error-500 text-center mb-3 font-semibold">
                        Erro ao carregar animes
                    </Text>
                    <Text className="text-typography-500 dark:text-typography-400 text-center text-xs mb-4">
                        Algo deu errado ao falar com o servidor. Tente
                        novamente.
                    </Text>
                    <Pressable
                        className="px-5 py-3 rounded-full bg-primary-500"
                        onPress={() => refetch()}
                    >
                        <Text className="text-white font-semibold text-sm">
                            Tentar de novo
                        </Text>
                    </Pressable>
                </Center>
            </Box>
        );
    }

    const hasResults = searchQuery && searchResults.length > 0;
    const isEmptySearch = searchQuery && searchResults.length === 0;

    return (
        <Box className="flex-1 bg-background-0 dark:bg-background-0">
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeroHeader />

                {!searchQuery && featuredAnime && (
                    <HomeBanner
                        anime={featuredAnime}
                        onPress={() => handleAnimePress(featuredAnime.id)}
                    />
                )}

                {hasResults && (
                    <AnimeRow
                        title={`Resultados para "${searchQuery}"`}
                        animes={searchResults}
                        onAnimePress={handleAnimePress}
                    />
                )}

                {isEmptySearch && (
                    <Center className="mt-12 px-10">
                        <Text className="text-typography-0 dark:text-typography-0 font-semibold mb-2 text-base text-center">
                            Nada encontrado
                        </Text>
                        <Text className="text-typography-400 dark:text-typography-200 text-xs text-center">
                            Tente outro título, gênero ou verifique a ortografia
                            da sua busca.
                        </Text>
                    </Center>
                )}

                {!searchQuery && (
                    <>
                        <AnimeRow
                            title="Populares agora"
                            animes={popularAnimes}
                            onAnimePress={handleAnimePress}
                        />
                        <AnimeRow
                            title="Em alta na comunidade"
                            animes={trendingAnimes}
                            onAnimePress={handleAnimePress}
                        />
                    </>
                )}
            </ScrollView>
        </Box>
    );
}
