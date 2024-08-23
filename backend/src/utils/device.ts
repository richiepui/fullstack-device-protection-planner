import { IClaim, IDevice } from "../models/Device";

export interface IAddDevice {
    userId: string;
    name: string;
    type: string;
    manufacturer: string;
    modelNumber: string;
    serialNumber: string;
    purchaseDate: Date;
    warrantyExpiryDate: Date;
    protectionPlan?: IAddDeviceProtectionPlan;
}


export interface IUpdateDevice {
    deviceId: string;
    userId: string,
    name: string;
    type: string;
    manufacturer: string;
    modelNumber: string;
    serialNumber: string;
    purchaseDate: Date;
    warrantyExpiryDate: Date;
    protectionPlan?: IUpdatedProtectionPlan;
    aiRecommendations: string[];
    claimHistory: IClaim[]; 
}

export interface IGetDevice {
    userId: string;
}

export interface IProtectionPlan {
    planName: string;
    startDate: Date;
    endDate: Date;
    coverage: string[];
    status: string;
}

export interface IUpdatedProtectionPlan extends IProtectionPlan {
    _id: string
}

export interface IAddDeviceProtectionPlan {
    planName: string;
    durationMonths: number;
    coverage: string[];
}

export interface IExtendProtectionPlan {
    durationMonths: number;
}

export interface ITransformedDevice {
    deviceId: string;
    userId: string;
    name: string;
    type: string;
    manufacturer: string;
    modelNumber: string;
    serialNumber: string;
    purchaseDate: Date;
    warrantyExpiryDate: Date;
    protectionPlan?: IProtectionPlan | null;
    aiRecommendations: string[];
    claimHistory: IClaim[];
}

export const transformDevice = (device: IDevice): ITransformedDevice => {
    return {
        deviceId: device._id!.toString(),
        userId: device.userId.toString(),
        name: device.name,
        type: device.type,
        manufacturer: device.manufacturer,
        modelNumber: device.modelNumber,
        serialNumber: device.serialNumber,
        purchaseDate: device.purchaseDate,
        warrantyExpiryDate: device.warrantyExpiryDate,
        protectionPlan: device.protectionPlan || null,
        aiRecommendations: device.aiRecommendations || [],
        claimHistory: device.claimHistory || [],
    };
};


