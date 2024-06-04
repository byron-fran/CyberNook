import {Router, request, response} from 'express';
import { createSession, paymentSheet } from '../controllers/payment.controller';

import { verifyToken } from '../jwt/verifyToken';
const router = Router();


router.get('/payment-checkout', verifyToken, createSession);
router.post('/payment-sheet', paymentSheet)

export default router
