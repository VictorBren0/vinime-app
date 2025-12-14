import { configureStore } from '@reduxjs/toolkit';
import animeReducer, { clearFavorites } from './slices/animeSlice';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import { logout } from './slices/authSlice';

export const store = configureStore({
  reducer: {
    anime: animeReducer,
    user: userReducer,
    auth: authReducer,
  },
});

// Listener para limpar favoritos ao fazer logout
store.subscribe(() => {
  const state = store.getState();
  if (!state.auth.isAuthenticated && state.anime.favorites.length > 0) {
    store.dispatch(clearFavorites());
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
