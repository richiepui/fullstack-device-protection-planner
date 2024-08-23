import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginThunk, registerThunk, verifyJwtThunk } from './authThunk';
import Cookies from 'js-cookie'

interface AuthState {
    userId: string | null;
    username: string | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    userId: null,
    username: null,
    token: null,
    isLoading: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            Cookies.set('jwt', action.payload, { expires: 5})
        },
        removeToken: (state) => {
            state.token = null;
            Cookies.remove('jwt');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.token = action.payload.token
                Cookies.set('jwt', action.payload.token, {expires: 5})
                state.userId = action.payload.userId
                state.username = action.payload.username
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
            .addCase(registerThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerThunk.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(registerThunk.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(verifyJwtThunk.fulfilled, (state, action) => {
                state.userId = action.payload.data.userId
                state.username = action.payload.data.username
            })
    }
});

export const { setToken, removeToken } = authSlice.actions;
export const authReducer = authSlice.reducer;