import { IDevice } from '@/types/device';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchDevicesThunk } from './deviceThunk';

interface DeviceState {
    devices: IDevice[];
    isLoading: boolean;
}

const initialState: DeviceState = {
    devices: [],
    isLoading: false
};

const deviceSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDevicesThunk.pending,(state) => {
                state.isLoading = true
            })
            .addCase(fetchDevicesThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.devices = action.payload.data
            })
            .addCase(fetchDevicesThunk.rejected, (state) => {
                state.isLoading = false
                state.devices = []
            })
    }
});

export const {
} = deviceSlice.actions;

export const deviceReducer = deviceSlice.reducer;
