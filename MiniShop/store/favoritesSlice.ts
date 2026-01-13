import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FavoriteItem {
  id: number;
  title: string;
  price: number;
  image?: string;
}

interface FavoritesState {
  items: FavoriteItem[];
}

const initialState: FavoritesState = {
  items: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<FavoriteItem>) {
      const exists = state.items.find(i => i.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter(i => i.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
