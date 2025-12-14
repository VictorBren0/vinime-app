import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collection, doc, setDoc, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/firebase';

interface Anime {
  id: number;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  coverImage: {
    large: string;
  };
  description: string;
}

interface AnimeState {
  list: Anime[];
  favorites: Anime[];
  loading: boolean;
  error: string | null;
}

const initialState: AnimeState = {
  list: [],
  favorites: [],
  loading: false,
  error: null,
};

// Buscar favoritos do Firestore
export const fetchFavorites = createAsyncThunk(
  'anime/fetchFavorites',
  async (userId: string) => {
    const favoritesRef = collection(db, 'users', userId, 'favorites');
    const snapshot = await getDocs(favoritesRef);
    const favorites: Anime[] = [];
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      
      // Validar e normalizar os dados
      if (data && data.id && data.title && data.coverImage) {
        favorites.push({
          id: data.id,
          title: {
            romaji: data.title?.romaji || '',
            english: data.title?.english || '',
            native: data.title?.native || ''
          },
          coverImage: {
            large: typeof data.coverImage === 'string' 
              ? data.coverImage 
              : data.coverImage?.large || data.coverImage?.extraLarge || ''
          },
          description: data.description || ''
        });
      }
    });
    
    return favorites;
  }
);

// Adicionar aos favoritos no Firestore
export const addToFavorites = createAsyncThunk(
  'anime/addToFavorites',
  async ({ userId, anime }: { userId: string; anime: Anime }) => {
    const favoriteRef = doc(db, 'users', userId, 'favorites', anime.id.toString());
    
    // Garantir que salvamos apenas dados serializáveis
    const animeData = {
      id: anime.id,
      title: {
        romaji: anime.title.romaji || '',
        english: anime.title.english || '',
        native: anime.title.native || ''
      },
      coverImage: {
        large: anime.coverImage.large || anime.coverImage.extraLarge || ''
      },
      description: anime.description || ''
    };
    
    await setDoc(favoriteRef, animeData);
    return animeData;
  }
);

// Remover dos favoritos no Firestore
export const removeFromFavorites = createAsyncThunk(
  'anime/removeFromFavorites',
  async ({ userId, animeId }: { userId: string; animeId: number }) => {
    const favoriteRef = doc(db, 'users', userId, 'favorites', animeId.toString());
    await deleteDoc(favoriteRef);
    return animeId;
  }
);

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    setAnimeList(state, action: PayloadAction<Anime[]>) {
      state.list = action.payload;
    },
    clearFavorites(state) {
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Favorites
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar favoritos';
      })
      // Add to Favorites
      .addCase(addToFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites.push(action.payload);
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao adicionar favorito';
      })
      // Remove from Favorites
      .addCase(removeFromFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = state.favorites.filter((a) => a.id !== action.payload);
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao remover favorito';
      });
  },
});

export const { setAnimeList, clearFavorites } = animeSlice.actions;
export default animeSlice.reducer;
