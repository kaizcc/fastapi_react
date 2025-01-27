import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 0 | 1; // 0 for user, 1 for admin

export interface User {
  id: number;
  username: string;
  email: string;
  nickname: string;
  avatar?: string;
  role: UserRole;
  created_time: string;
  updated_time: string;
  others: any;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

// Load initial state from localStorage
const loadState = () => {
  try {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    return {
      isAuthenticated: !!token,
      user,
      token,
    };
  } catch (e) {
    return {
      isAuthenticated: false,
      user: null,
      token: null,
    };
  }
};

const initialState: AuthState = loadState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      // Persist user data
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      // Persist token
      localStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      // Clear persisted data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { setUser, setToken, logout } = authSlice.actions;

export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectIsAdmin = (state: { auth: AuthState }) => state.auth.user?.role === 1;

export default authSlice.reducer; 