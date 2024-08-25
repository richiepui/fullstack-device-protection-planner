import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth/authSlice'
import { deviceReducer } from './slices/device/deviceSlice';


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