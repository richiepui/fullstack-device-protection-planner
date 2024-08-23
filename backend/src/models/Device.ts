import mongoose, { Schema, Document } from 'mongoose';

interface IProtectionPlan {
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

export interface IDevice extends Document {
    userId: mongoose.Schema.Types.ObjectId;
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


const ProtectionPlanSchema: Schema = new Schema({
    planName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    coverage: { type: [String], required: true },
    status: { type: String, required: true }
});

const ClaimSchema: Schema = new Schema({
    date: { type: Date, required: true },
    type: { type: String, required: true },
    resolution: { type: String, required: true }
});


const DeviceSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    manufacturer: { type: String, required: true },
    modelNumber: { type: String, required: true },
    serialNumber: { type: String, required: true, unique: true },
    purchaseDate: { type: Date, required: true },
    warrantyExpiryDate: { type: Date, required: true },
    protectionPlan: { type: ProtectionPlanSchema, required: false, default: null },
    aiRecommendations: { type: [String], default: [] },
    claimHistory: { type: [ClaimSchema], default: [] }
});

const Device = mongoose.model<IDevice>('Device', DeviceSchema, 'devices');
export default Device;