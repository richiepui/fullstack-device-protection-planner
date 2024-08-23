import axios from 'axios';
import { IAddUpdateDeviceApiResponse, IDevice, IFetchDeviceApiResponse, IAddProtectionPlanRequest, IAddExtendProtectionPlanApiResponse, IExtendProtectionPlanRequest, IAddDeviceRequest } from '@/types/device';

// API to fetch all devices
export const fetchDevicesApi = async (userId: string, token: string): Promise<IFetchDeviceApiResponse> => {
    try {
        const response = await axios.get('http://localhost:3000/devices', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                userId: userId
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching devices: ', error);
        throw error;
    }
};

// API to add a new device
export const addDeviceApi = async (deviceData: IAddDeviceRequest, token: string): Promise<IAddUpdateDeviceApiResponse> => {
    try {
        const response = await axios.post('http://localhost:3000/devices', deviceData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding device: ', error);
        throw error;
    }
};

// API to update an existing device
export const updateDeviceApi = async (deviceData: IDevice, token: string): Promise<IAddUpdateDeviceApiResponse> => {
    try {
        const response = await axios.patch(`http://localhost:3000/devices/${deviceData.deviceId}`, deviceData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating device: ', error);
        throw error;
    }
};

// API to delete a device
export const deleteDeviceApi = async (deviceId: string, token: string): Promise<void> => {
    try {
        await axios.delete(`http://localhost:3000/devices/${deviceId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('Error deleting device: ', error);
        throw error;
    }
};

// API to add protection plan to a specific device
export const addProtectionPlanApi = async (
    deviceId: string,
    protectionPlanData: IAddProtectionPlanRequest,
    token: string
): Promise<IAddExtendProtectionPlanApiResponse> => {
    try {
        const response = await axios.post(
            `http://localhost:3000/devices/${deviceId}/protection-plan`,
            protectionPlanData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error adding protection plan:', error);
        throw error;
    }
};

// API to extend protection plan for a specific device
export const extendProtectionPlanApi = async (
    deviceId: string,
    extensionData: IExtendProtectionPlanRequest,
    token: string
): Promise<IAddExtendProtectionPlanApiResponse> => {
    try {
        const response = await axios.patch(
            `http://localhost:3000/devices/${deviceId}/protection-plan/extend`,
            extensionData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error extending protection plan:', error);
        throw error;
    }
};