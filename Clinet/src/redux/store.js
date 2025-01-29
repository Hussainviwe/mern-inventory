import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice'; // ✅ Correct import name

export const store = configureStore({
  reducer: {
    user: userReducer, // ✅ Correct key name
  },
});
