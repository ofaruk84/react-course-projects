import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = { isAuthtenticated: false };
const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthtenticated = true;
    },
    logout(state) {
      state.isAuthtenticated = false;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
