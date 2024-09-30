import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // user data, including role, will be stored here
  token: localStorage.getItem('token') || null, // retain token if user is already logged in
  isAuthenticated: false, // tracks whether user is authenticated
  loading: false, // optional, useful for async operations
  error: null, // tracks any errors during auth
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user; // Ensure user object includes role (e.g., user.role)
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token); // Store the token in localStorage
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('token'); // Clear token from localStorage
    },
    // Optional: handle loading and error states
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    authFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, logout, authStart, authFail } = authSlice.actions;
export default authSlice.reducer;
