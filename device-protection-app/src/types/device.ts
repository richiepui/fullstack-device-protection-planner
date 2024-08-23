export interface IFetchDeviceApiResponse {
    data: IDevice[]
}

export interface IAddUpdateDeviceApiResponse {
    data: IDevice
}

export interface IProtectionPlan {
    planName: string;
    startDate: Date;
    endDate: Date;
    coverage: string[];
    status: string;
}

export interface IClaim {
    date: Date;
    type: string;
    resolution: string;
}

// This is the interface used in front-end
export interface IDeviceDataFormat {
    name: string;
    type: string;
    manufacturer: string;
    modelNumber: string;
    serialNumber: string;
    purchaseDate: string;
    warrantyExpiryDate: string;
    hasProtectionPlan: boolean;
    protectionPlan: {
        planName: string;
        durationMonths: number;
        coverage: string[];
    };
}


export interface IAddDeviceRequest {
    userId: string;
    name: string;
    type: string;
    manufacturer: string;
    modelNumber: string;
    serialNumber: string;
    purchaseDate: Date;
    warrantyExpiryDate: Date;
    protectionPlan?: {
        planName: string;
        durationMonths: number;
        coverage: string[];
    };
}

export interface IDevice {
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

export interface IAddProtectionPlanRequest {
    planName: string;
    durationMonths: number;
    coverage: string[]
}

export interface IAddExtendProtectionPlanApiResponse {
    message: string;
}

export interface IExtendProtectionPlanRequest {
    durationMonths: number;
}