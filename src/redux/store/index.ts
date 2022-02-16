import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './slices/movieSlice';
import gameReducer from './slices/gamesSlice';

 const store = configureStore({
  reducer: {
    movie : movieReducer,
    games : gameReducer
  }
});

export type RootState = ReturnType<typeof store.getState>

export default store;