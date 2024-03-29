import {Router, request, response} from 'express';
import { createSession } from '../controllers/payment.controller';
import { AxiosError } from 'axios';
import { verifyToken } from '../jwt/verifyToken';
const router = Router();


router.get('/payment-checkout', verifyToken, createSession);


export default router
