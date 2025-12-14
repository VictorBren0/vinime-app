import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserState {
  name: string;
  email: string;
  theme: 'light' | 'dark';
}

const initialState: UserState = {
  name: '',
  email: '',
  theme: 'dark',
};

// Carregar tema do AsyncStorage
export const loadTheme = createAsyncThunk(
  'user/loadTheme',
  async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('app_theme');
      return savedTheme as 'light' | 'dark' | null;
    } catch (error) {
      return null;
    }
  }
);

// Salvar tema no AsyncStorage
export const saveTheme = createAsyncThunk(
  'user/saveTheme',
  async (theme: 'light' | 'dark') => {
    try {
      await AsyncStorage.setItem('app_theme', theme);
      return theme;
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<{ name: string; email: string }>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTheme.fulfilled, (state, action) => {
        if (action.payload) {
          state.theme = action.payload;
        }
      })
      .addCase(saveTheme.fulfilled, (state, action) => {
        state.theme = action.payload;
      });
  },
});

export const { setUserData, toggleTheme } = userSlice.actions;
export default userSlice.reducer;
