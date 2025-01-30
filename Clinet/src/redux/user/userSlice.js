import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      return { ...state, loading: true, error: null, currentUser: null };
    },
    signInSuccess: (state, action) => {
      return { ...state, currentUser: action.payload, loading: false, error: null };
    },
    signInFailure: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
    logout: (state) => {
      return { ...state, currentUser: null, loading: false, error: null };
    },
  },
});

export const { signInStart, signInSuccess, signInFailure, logout } = userSlice.actions;
export default userSlice.reducer;
