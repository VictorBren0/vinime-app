import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Image } from '@/components/ui/image';
import { Pressable } from '@/components/ui/pressable';
import { VStack } from '@/components/ui/vstack';

const BORDER_COLOR = 'rgba(147, 51, 234, 0.55)';

interface AnimeCardProps {
  anime: {
    id: number;
    title: {
      romaji: string;
      english: string;
      native: string;
    };
    coverImage: {
      large: string;
    };
  };
  onPress: () => void;
  variant?: 'grid' | 'horizontal';
}

export default function AnimeCard({ anime, onPress, variant = 'horizontal' }: AnimeCardProps) {
  if (variant === 'horizontal') {
    return (
      <Pressable onPress={onPress} className="mr-3">
        <VStack className="w-32">
          <Box
            className="rounded-sm overflow-hidden mb-1.5 bg-background-50 dark:bg-background-50"
            style={{ borderWidth: 1, borderColor: BORDER_COLOR }}
          >
            <Image
              source={{ uri: anime.coverImage.large }}
              alt={anime.title.romaji}
              className="w-full h-48 object-cover"
              resizeMode="cover"
            />
          </Box>
          <Text className="text-[11px] font-medium" numberOfLines={2}>
            {anime.title.english || anime.title.romaji}
          </Text>
        </VStack>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} className="flex-1 p-1">
      <Box
        className="bg-background-50 dark:bg-background-50 rounded-md overflow-hidden transition-transform"
        style={{ borderWidth: 1, borderColor: BORDER_COLOR }}
      >
        <Image
          source={{ uri: anime.coverImage.large }}
          alt={anime.title.romaji}
          className="w-full h-72 object-cover"
          resizeMode="cover"
        />
        <VStack className="p-2 space-y-0.5">
          <Text className="font-semibold text-xs" numberOfLines={2}>
            {anime.title.english || anime.title.romaji}
          </Text>
        </VStack>
      </Box>
    </Pressable>
  );
}
