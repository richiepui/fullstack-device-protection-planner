import { RequestHandler } from 'express';
import bycrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../../models/User';
import { jwtTokenSchema, userSchema } from './userValidation';
import { IJwtToken, IUserDetails } from '../../utils/user';


export const registerUser: RequestHandler = async(req, res) => {
    const { error } = userSchema.validate(req.body)
    if (error){
        console.error("Validation error: ", error.details)
        return res.status(400).json({code: 400, message: error.details[0].message })
    }
    const newUserData: IUserDetails = req.body;

    try{
        const existingUser = await User.findOne({username: newUserData.username});
        if (existingUser) {
            return res.status(400).json({ code:400, message: 'Username already exists' });
        }
        const hashedPassword = await bycrypt.hash(newUserData.password, 10);
        const user = new User({
            username: newUserData.username,
            password: hashedPassword
        });
        await user.save()
        res.status(201).json({code: 201, message: 'User registered successfully'})
    } catch (error: any) {
        console.error('Error registering user: ', error.message);
        res.status(500).json({code: 500, message: error.message})
    }
}


export const verifyUser: RequestHandler = async(req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error){
        console.error("Validation error: ", error.details)
        return res.status(400).json({ code: 400, message: error.details[0].message })
    }

    const userData: IUserDetails = req.body;

    try{
        const user = await User.findOne({username: userData.username});
        if (!user){
            return res.status(400).json({code: 400, message: 'Invalid Username'})
        }

        const isMatch = await bycrypt.compare(userData.password, user.password);
        if (!isMatch){
            return res.status(400).json({code: 400, message: 'Invalid Password'});
        }

        const token = jwt.sign({userId: user._id, username: user.username}, process.env.JWT_SECRET!, {
            expiresIn: '5h'
        });
        res.status(200).json({ code: 200,  token });

    } catch (error: any){
        console.error('Error verifying user: ', error.message);
        res.status(500).json({code: 500, message: error.message})
    }
}

export const verifyJwt: RequestHandler = (req, res) => {

    const { error } = jwtTokenSchema.validate(req.body);

    if (error){
        console.error("Validation error: ", error.details);
        return res.status(400).json({ code: 400, message: error.details[0].message });
    }

    const jwtToken: IJwtToken = req.body;
    
    try{
        const decoded = jwt.verify(jwtToken.token, process.env.JWT_SECRET!) as JwtPayload;
        const userId = decoded.userId;
        const username = decoded.username;
        res.status(200).json({code: 201, message: "Successfully Authenticated", data: {userId, username}});
    } catch (error: any) {
        console.error('Error verifying Jwt Token: ', error.message);
        res.status(401).json({code: 401, message: "Invalid Token"})
    }
}