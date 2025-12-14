import React from 'react';
import { ScrollView } from 'react-native';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import AnimeCard from './AnimeCard';

interface AnimeRowProps {
  title: string;
  animes: any[];
  onAnimePress: (animeId: number) => void;
}

export default function AnimeRow({ title, animes, onAnimePress }: AnimeRowProps) {
  return (
    <VStack className="mb-6">
      <Text className="text-lg font-bold px-4 mb-3">{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {animes.map((anime) => (
          <AnimeCard
            key={anime.id}
            anime={anime}
            onPress={() => onAnimePress(anime.id)}
            variant="horizontal"
          />
        ))}
      </ScrollView>
    </VStack>
  );
}
