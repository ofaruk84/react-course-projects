import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../store/auth';
import counterSlice from '../store/counter';

const store = configureStore({
  reducer: { counter: counterSlice, auth: authSlice },
});

export default store;
