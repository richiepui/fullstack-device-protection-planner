import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token){
        return res.status(401).json({ message: 'Authorization denied'});
    }
    try{
        jwt.verify(token, process.env.JWT_SECRET!);
        next()
    } catch (err) {
        res.status(401).json({message: 'Invalid token'})
    }
}

module.exports = auth;