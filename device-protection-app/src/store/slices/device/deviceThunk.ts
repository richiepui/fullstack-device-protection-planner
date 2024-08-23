import { AppDispatch, RootState } from "@/store/store";
import Cookies from "js-cookie";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { generateApiError } from "@/common/APIError";
import { IAddUpdateDeviceApiResponse, IDevice, IFetchDeviceApiResponse, IAddDeviceRequest, IAddProtectionPlanRequest, IExtendProtectionPlanRequest, IAddExtendProtectionPlanApiResponse } from "@/types/device";
import {
    fetchDevicesApi,
    addDeviceApi,
    updateDeviceApi,
    deleteDeviceApi,
    addProtectionPlanApi,
    extendProtectionPlanApi
} from "@/services/device";
import ErrorCodes from '@/common/error-codes';

const fetchDevices = async (userId: string): Promise<IFetchDeviceApiResponse> => {
    try {
        const token = Cookies.get('jwt') || "";
        const response = await fetchDevicesApi(userId, token);
        if (!response) {
            throw new Error('Unable to fetch devices');
        }
        return response;
    } catch (error) {
        console.error('Error in fetchDevices', error);
        throw error;
    }
}

const addDevice = async (deviceData: IAddDeviceRequest): Promise<IAddUpdateDeviceApiResponse> => {
    try {
        const token = Cookies.get('jwt') || "";
        const response = await addDeviceApi(deviceData, token);
        if (!response) {
            throw new Error('Unable to add device');
        }
        return response;
    } catch (error) {
        console.error('Error in addDevice', error);
        throw error;
    }
}

const updateDevice = async (deviceData: IDevice): Promise<IAddUpdateDeviceApiResponse> => {
    try {
        const token = Cookies.get('jwt') || "";
        const response = await updateDeviceApi(deviceData, token);
        if (!response) {
            throw new Error('Unable to update device');
        }
        return response;
    } catch (error) {
        console.error('Error in updateDevice', error);
        throw error;
    }
}

const deleteDevice = async (deviceId: string): Promise<void> => {
    try {
        const token = Cookies.get('jwt') || "";
        await deleteDeviceApi(deviceId, token);
    } catch (error) {
        console.error('Error in deleteDevice', error);
        throw error;
    }
}

const addProtectionPlan = async (deviceId: string, protectionPlanData: IAddProtectionPlanRequest): Promise<IAddExtendProtectionPlanApiResponse> => {
  try{
    const token = Cookies.get('jwt') || "";
    const response = await addProtectionPlanApi(deviceId, protectionPlanData, token);
    if (!response){
      throw new Error('Unable to add device protection plan');
    }
    return response;

  } catch (error){
    console.error("Error in addDeviceProtection", error);
    throw error;
  }
}

const extendProtectionPlan = async(deviceId: string, extendedData: IExtendProtectionPlanRequest): Promise<IAddExtendProtectionPlanApiResponse> => {
  try{
    const token = Cookies.get('jwt') || "";
    const response = await extendProtectionPlanApi(deviceId, extendedData, token);
    if (!response){
      throw new Error('Unable to extend device protection plan');
    }
    return response;
  } catch (error) {
    console.error("Error in extendDeviceProtection", error);
    throw error;
  }
}

export const fetchDevicesThunk = createAsyncThunk<
  IFetchDeviceApiResponse,
  string,
  { dispatch: AppDispatch; state: RootState }
>(
  'devices/fetchDevices',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetchDevices(userId);
      return response;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(
        generateApiError(
          ErrorCodes.UNABLE_TO_FETCH_DEVICES,
          `Unable to fetch devices`,
          error.response?.data?.message || error.message,
        ),
      );
    }
  }
);

export const addDeviceThunk = createAsyncThunk<
  IAddUpdateDeviceApiResponse,
  IAddDeviceRequest,
  { dispatch: AppDispatch; state: RootState }
>(
  'devices/addDevice',
  async (deviceData, { rejectWithValue }) => {
    try {
      const response = await addDevice(deviceData);
      return response;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(
        generateApiError(
          ErrorCodes.UNABLE_TO_ADD_DEVICE,
          `Unable to add device`,
          error.response?.data?.message || error.message,
        ),
      );
    }
  }
);

export const updateDeviceThunk = createAsyncThunk<
  IAddUpdateDeviceApiResponse,
  IDevice,
  { dispatch: AppDispatch; state: RootState }
>(
  'devices/updateDevice',
  async (deviceData, { rejectWithValue }) => {
    try {
      const response = await updateDevice(deviceData);
      return response;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(
        generateApiError(
          ErrorCodes.UNABLE_TO_UPDATE_DEVICE,
          `Unable to update device`,
          error.response?.data?.message || error.message,
        ),
      );
    }
  }
);

export const deleteDeviceThunk = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; state: RootState }
>(
  'devices/deleteDevice',
  async (deviceId, { rejectWithValue }) => {
    try {
      const response = await deleteDevice(deviceId);
      return response;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(
        generateApiError(
          ErrorCodes.UNABLE_TO_DELETE_DEVICE,
          `Unable to delete device`,
          error.response?.data?.message || error.message,
        ),
      );
    }
  }
);

export const addProtectionPlanThunk = createAsyncThunk<
  IAddExtendProtectionPlanApiResponse,
  {deviceId: string, protectionData: IAddProtectionPlanRequest},
  { dispatch: AppDispatch; state: RootState}
  >(
    '/devices/addProtectionPlan',
    async({deviceId, protectionData}, { rejectWithValue }) => {
      try{
        const response = await addProtectionPlan(deviceId, protectionData);
        return response;
      } catch (error: any){
        console.error(error);
        return rejectWithValue(
          generateApiError(
            ErrorCodes.UNABLE_TO_ADD_PROTECTION_PLAN_FOR_DEVICE,
            `Unable to add protection plan for device`,
            error.response?.data?.message || error.message,
          ),
        );
      }
    }
)

export const extendProtectionPlanThunk = createAsyncThunk<
  IAddExtendProtectionPlanApiResponse,
  {deviceId: string, extendedData: IExtendProtectionPlanRequest},
  { dispatch: AppDispatch; state: RootState}
  >(
    '/devices/addProtectionPlan',
    async({deviceId, extendedData}, { rejectWithValue }) => {
      try{
        const response = await extendProtectionPlan(deviceId, extendedData);
        return response;
      } catch (error: any){
        console.error(error);
        return rejectWithValue(
          generateApiError(
            ErrorCodes.UNABLE_TO_EXTEND_PROTECTION_PLAN_FOR_DEVICE,
            `Unable to add protection plan for device`,
            error.response?.data?.message || error.message,
          ),
        );
      }
    }
)
