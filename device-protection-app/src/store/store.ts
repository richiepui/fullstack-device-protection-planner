import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth/authSlice'
import { deviceReducer } from './slices/device/deviceSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export const store = configureStore({
    reducer: {
        auth: authReducer,
        device: deviceReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;