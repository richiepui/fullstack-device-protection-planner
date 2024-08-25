import { Router } from 'express';
import { 
    addDevice, 
    getDevices, 
    updateDevice, 
    deleteDevice, 
    addDeviceProtectionPlan, 
    extendProtectionPlan,
    getAIRecommendations
} from '../controllers/device/deviceController';


const auth = require('../middleware/userAuth');

const router = Router()

router.post('/', auth, addDevice); // Create a Device
router.get('/', auth, getDevices); // Retrieve Devices based on User ID
router.patch('/:id', auth, updateDevice); // Update a Specific Device based on Device ID
router.delete('/:id', auth, deleteDevice); // Delete a Specific Device based on Device ID
router.post('/:id/protection-plan', auth, addDeviceProtectionPlan); // Add Protection Plan to a Specific Device
router.patch('/:id/protection-plan/extend', auth, extendProtectionPlan); // Extend Protection Plan for a Specific Device
router.post('/ai-recommendations', auth, getAIRecommendations); // Get AI Recommendations from Open AI

export default router;
