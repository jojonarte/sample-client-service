import { createSlice } from '@reduxjs/toolkit';


export interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn(state, action) {
        state.isLoggedIn = true
        state.token = action.payload.token
      },
    logOut(state) {
      state.isLoggedIn = false
      state.token = null
    }
  },
})