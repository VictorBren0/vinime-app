import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Image } from '@/components/ui/image';
import { Pressable } from '@/components/ui/pressable';
import { VStack } from '@/components/ui/vstack';

interface HomeBannerProps {
  anime: {
    id: number;
    title: {
      romaji: string;
      english: string;
      native: string;
    };
    bannerImage?: string;
    coverImage: {
      extraLarge: string;
    };
    description?: string;
  };
  onPress: () => void;
}

export default function HomeBanner({ anime, onPress }: HomeBannerProps) {
  const imageSource = anime.bannerImage || anime.coverImage.extraLarge;

  return (
    <Pressable onPress={onPress} className="mb-3 overflow-hidden mx-0">
      <Box className="relative h-80 w-full">
        <Image
          source={{ uri: imageSource }}
          alt={anime.title.romaji}
          className="w-full h-full object-cover"
          resizeMode="cover"
        />
        <Box
          className="absolute inset-0 bg-background-950/40 dark:bg-background-0/40"
        />
        <Box className="absolute inset-0 bg-gradient-to-t from-background-0 via-background-0/70 to-transparent" />
        <Box className="absolute bottom-0 left-0 right-0 p-6">
          <VStack className="space-y-3">
            <Text className="text-white font-bold text-4xl" numberOfLines={2}>
              {anime.title.english || anime.title.romaji}
            </Text>
            <Text className="text-white text-sm leading-5" numberOfLines={3}>
              {anime.description?.replace(/<[^>]+>/g, '')}
            </Text>
          </VStack>
        </Box>
      </Box>
    </Pressable>
  );
}
