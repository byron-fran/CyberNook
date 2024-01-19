import { request, response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AxiosError } from 'axios';
dotenv.config();

export const verifyTokenPayment = async (req = request, res = response, next: NextFunction) => {
    const { authorization } = req.headers;
    let token = "";
    
    

    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        token = authorization.substring(7);
    }

    try {
        if (!token) { return res.status(404).json({ message: 'Token no provided' }) }
        //verify token
        const user = jwt.verify(token, process.env.SECRET_KEY_ORDER!) as JwtPayload;
        if (!user) { return res.status(401).json({ message: 'Unauthorized' }) }
        req.body.UserId = user.id as string;

    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            return res.status(500).json({ message: error.message })
        }
        else if(error instanceof jwt.JsonWebTokenError){
            return res.status(500).json({ message: error.message })
        }
        return res.status(504).json({error})
    }


    next()
}