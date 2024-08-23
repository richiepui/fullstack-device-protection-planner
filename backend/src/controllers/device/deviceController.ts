import { RequestHandler } from 'express';
import Device from '../../models/Device'
import { 
    addDeviceProtectionPlanSchema, 
    addDeviceSchema, 
    extendDeviceProtectionPlanSchema, 
    getDeviceSchema, 
    updateDeviceSchema 
} from './deviceValidation';
import { 
    IAddDevice, 
    IUpdateDevice, 
    IAddDeviceProtectionPlan, 
    IExtendProtectionPlan, 
    transformDevice
} from '../../utils/device';

// Function to add a new device
export const addDevice: RequestHandler = async(req, res) => {
    // Joi Validation to check request body
    const { error } = addDeviceSchema.validate(req.body);
    if (error) {
        console.error('Validation error: ', error.details)
        return res.status(400).json({ code:400, message: error.details[0].message })
    }
    const deviceData: IAddDevice = req.body;

    try {
        const existingDevice = await Device.findOne({serialNumber: deviceData.serialNumber})
        if (existingDevice) {
            return res.status(400).json({ code:400, message: 'A device with this serial number already exists.'})
        }

        let device;

        if (deviceData.purchaseDate > deviceData.warrantyExpiryDate){
            return res.status(400).json({ code: 400, message: 'Purchase Date cannot be later than Warranty Date'})
        }

        if (deviceData.protectionPlan){
            const startDate = new Date();
            const endDate = new Date();
            endDate.setMonth(endDate.getMonth() + deviceData.protectionPlan.durationMonths);
            device = new Device({
                userId: deviceData.userId,
                name: deviceData.name,
                type: deviceData.type,
                manufacturer: deviceData.manufacturer,
                modelNumber: deviceData.modelNumber,
                serialNumber: deviceData.serialNumber,
                purchaseDate: new Date(deviceData.purchaseDate),
                warrantyExpiryDate: new Date(deviceData.warrantyExpiryDate),
                protectionPlan: {
                    planName: deviceData.protectionPlan.planName,
                    startDate: startDate,
                    endDate: endDate,
                    coverage: deviceData.protectionPlan.coverage,
                    status: 'Active'
                },
                aiRecommendations: [],
                claimHistory: []
            })
        } else {
            device = new Device({
                ...deviceData,
                purchaseDate: new Date(deviceData.purchaseDate),
                warrantyExpiryDate: new Date(deviceData.warrantyExpiryDate),
                aiRecommendations: [],
                claimHistory: []
            })
        }
        await device.save()
        res.status(201).json({code: 201, message: 'Device added successfully'})
    } catch (error: any) {
        console.error('Error adding device:', error.message);
        res.status(500).json({ code: 500, message: error.message})
    }
}

// Function to get all devices for a user
export const getDevices: RequestHandler = async(req, res) => {

    // Joi Validation to check request body
    const { error } = getDeviceSchema.validate(req.query);
    if (error){
        console.error('Validation error: ', error.details)
        return res.status(400).json({code:400, message: error.details[0].message})
    }
    const userId = req.query.userId;

    try{
        const devices = await Device.find({ userId: userId })
        const formattedDevices = devices.map(transformDevice);
        res.status(200).json({code:200, message:"Devices fetched successfully" , data: formattedDevices});
    } catch (error: any){
        console.error('Error fetching devices:', error.message);
        res.status(500).json({error: error.message})
    }
}

// Function to update details of an existing device
export const updateDevice: RequestHandler = async(req, res) => {

    // Joi Validation to check request body
    const { error } = updateDeviceSchema.validate(req.body)
    if (error) {
        console.error('Validation error: ', error.details)
        return res.status(400).json({code: 400, message: error.details[0].message})
    }

    const updatedDeviceData: IUpdateDevice = req.body;

    if (updatedDeviceData.purchaseDate > updatedDeviceData.warrantyExpiryDate){
        return res.status(400).json({ code: 400, message: 'Purchase Date cannot be later than Warranty Date'})
    }

    try{
        const device = await Device.findOneAndUpdate(
            { _id: updatedDeviceData.deviceId },
            { 
                ...updatedDeviceData,
                purchaseDate: new Date(updatedDeviceData.purchaseDate),
                warrantyExpiryDate: new Date(updatedDeviceData.warrantyExpiryDate)
            },
            { new: true }
        )
        if (!device){
            return res.status(404).json({code:404, message: 'Device not found'})
        }

        res.status(200).json({code: 200, message: 'Device updated successfully'})
    } catch (error: any){
        console.error('Error updating device: ', error.message)
        res.status(500).json({code:200, message: error.message})
    }
}

// Function to delete a device
export const deleteDevice: RequestHandler = async(req, res) => {
    const { id } = req.params;
    try{
        const device = await Device.findOneAndDelete({_id: id})
        if (!device) {
            return res.status(404).json({code: 404, message: 'Device not found'});
        }
        res.status(200).json({ code:200, message: 'Device deleted successfully'});
    } catch (error: any){
        console.error('Error deleting device: ', error.message)
        res.status(500).json({code: 500, message: error.message})
    }
}

// Function to add a protection plan to a device
export const addDeviceProtectionPlan: RequestHandler = async(req, res) => {

    const { error } = addDeviceProtectionPlanSchema.validate(req.body);
    if (error) {
        console.error('Validation error: ', error.details);
        return res.status(400).json({code:400, message: error.details[0].message});
    }

    const { id } = req.params;
    const planData: IAddDeviceProtectionPlan = req.body;

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + planData.durationMonths);

    const protectionPlan = {
        planName: planData.planName, 
        startDate,
        endDate,
        coverage: planData.coverage,
        status: 'Active'
    }

    try{   
        const device = await Device.findByIdAndUpdate(
            id,
            { protectionPlan },
            { new: true }
        );

        if (!device){
            return res.status(404).json({message: "Device is not found"});
        }

        res.status(200).json({ code:200, message: 'Protection plan added successfully'});

    } catch (error: any){
        console.error('Error adding protection plan: ', error.message);
        res.status(500).json({error: error.message});
    }
}


export const extendProtectionPlan: RequestHandler = async(req, res) => {

    const { error } = extendDeviceProtectionPlanSchema.validate(req.body)
    if (error){
        return res.status(400).json({code: 400, message: error.details[0].message})
    }
    
    const monthDuration: IExtendProtectionPlan = req.body;

    const { id } = req.params;
    try{
        const device = await Device.findById(id);
        if (!device || !device.protectionPlan){
            return res.status(404).json({ code:404, message: 'Device or Protection Plan not found '});
        }
        
        const newEndDate = new Date(device.protectionPlan.endDate);
        newEndDate.setMonth(newEndDate.getMonth() + monthDuration.durationMonths);
        device.protectionPlan.endDate = newEndDate;
        device.protectionPlan.status = 'Active'

        await device.save();

        res.status(200).json({code:200, message: 'Protection plan extended successfully'});

    } catch (error:any){
        console.error('Error extending protection plan: ', error.message);
        res.status(500).json({code: 500, message: error.message});
    }
}