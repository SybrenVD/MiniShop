import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import themeReducer from './themeSlice';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
