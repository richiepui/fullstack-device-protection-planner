import Joi from 'joi'

export const addDeviceSchema = Joi.object({
    userId: Joi.string().required(),
    name: Joi.string().required(),
    type: Joi.string().required(),
    manufacturer: Joi.string().required(),
    modelNumber: Joi.string().required(),
    serialNumber: Joi.string().required(),
    purchaseDate: Joi.date().max('now').required(),
    warrantyExpiryDate: Joi.date().required(),
    protectionPlan: Joi.object({
        planName: Joi.string().required(),
        durationMonths: Joi.number().min(1).required(),
        coverage: Joi.array().items(Joi.string()).required(),
    }).optional() 
});


export const AIRecommendationSchema = Joi.object({
    userId: Joi.string().required(),
    deviceId: Joi.string().required()
})

export const updateDeviceSchema = Joi.object({
    deviceId: Joi.string().required(),
    userId: Joi.string().required(),
    name: Joi.string().required(),
    type: Joi.string().required(),
    manufacturer: Joi.string().required(),
    modelNumber: Joi.string().required(),
    serialNumber: Joi.string().required(),
    purchaseDate: Joi.date().max('now').required(),
    warrantyExpiryDate: Joi.date().required(),
    protectionPlan: Joi.object({
        planName: Joi.string().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        coverage: Joi.array().items(Joi.string()).required(),
        status: Joi.string().valid('Active', 'Expired').required(),
        _id: Joi.string().required()
    }).optional(),
    aiRecommendations: Joi.array().items(Joi.string()).optional(),
    claimHistory: Joi.array().items(Joi.object({
        date: Joi.date().required(),
        type: Joi.string().required(),
        resolution: Joi.string().required()
    })).optional()
})

export const getDeviceSchema = Joi.object({
    userId: Joi.string().required()
})

export const addDeviceProtectionPlanSchema = Joi.object({
    planName: Joi.string().required(),
    durationMonths: Joi.number().integer().min(1).required(), 
    coverage: Joi.array().items(Joi.string()).required()
})

export const extendDeviceProtectionPlanSchema = Joi.object({
    durationMonths: Joi.number().integer().min(1).required()
})
