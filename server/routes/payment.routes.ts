import {Router, request, response} from 'express';
import { createSession } from '../controllers/payment.controller';
import { AxiosError } from 'axios';
import { verifyToken } from '../jwt/verifyToken';
const router = Router();


router.get('/payment-checkout', verifyToken, createSession);


router.get('/payment-success', (req = request, res = response) => {
    
    try{
        
        return res.status(200).json({message : 'success'})
    }
    catch(error : unknown){
        if(error instanceof AxiosError){
            return res.status(500).json({message : error.message})
        }
        else{
        return res.status(500).json({message : 'Error unknown'})
        }
    }
});
router.get('/payment-cancel',(req = request, res = response) => {
    try{
        
        return res.status(200).json({message : 'cancel'})
    }
    catch(error : unknown){
        if(error instanceof AxiosError){
            return res.status(500).json({message : error.message})
        }
        else{
        return res.status(500).json({message : 'Error unknown'})
        }
    }
})


export default router