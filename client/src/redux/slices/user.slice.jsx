// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

// Initial state
const initialState = {
  userData: null,
  isAuthenticated: !!Cookies.get('idToken'),  // Check if the user is authenticated based on the cookie
  loading: false,
  error: null,
};

// User slice for managing login, logout, and register actions
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Login action to save user data and set authentication status
    loginFun(state, action) {
      
      console.log("Action in login function ",action)

      state.userData = action.payload.userData;  // Save user data (e.g. user details, tokens)
      state.isAuthenticated = true;

      // Set token and email in cookies
      Cookies.set('idToken', action.payload.token, { expires: 1 });  // Token will expire in 1 day
      Cookies.set('email', action.payload.userData.email, { expires: 1 });
    },

    // Register action to save new user data after registration
    registerFun(state, action) {
      state.userData = action.payload.userData;
      state.isAuthenticated = true;

      // Set token and email in cookies
      Cookies.set('idToken', action.payload.token, { expires: 1 });  // Token will expire in 1 day
      Cookies.set('email', action.payload.userData.email, { expires: 1 });
    },

    // Logout action to clear user data and reset state
    logoutFun(state) {
      state.userData = null;
      state.isAuthenticated = false;

      // Remove token and email cookies
      Cookies.remove('idToken');
      Cookies.remove('email');
    },

    // Optional: Error handling action
    setError(state, action) {
      state.error = action.payload;
    },
    
    // Loading state for async requests
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { loginFun, registerFun, logoutFun, setError, setLoading } = userSlice.actions;
export default userSlice.reducer;
