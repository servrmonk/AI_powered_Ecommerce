// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/user.slice'; // Import your user slice

const store = configureStore({
  reducer: {
    user: userReducer,  // Add your user reducer to the store
  },
});

export default store;
