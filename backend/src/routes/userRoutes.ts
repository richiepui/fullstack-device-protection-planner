import { Router } from 'express';
import { verifyUser, registerUser, verifyJwt } from '../controllers/user/userController';

const router = Router();

router.post('/register', registerUser); // User Registration
router.post('/login', verifyUser); // User Login
router.post('/verifyJwt', verifyJwt); //Jwt Verification

export default router
