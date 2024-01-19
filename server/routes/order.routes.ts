import { Router } from "express";
import {createOrder, deleteOrderById, updateOrder, getAllOrdersByUser,getAllOrdersByAdmin,updatePayment } from '../controllers/order.controller';
import { verifyToken } from "../jwt/verifyToken";
import { verifyTokenPayment } from "../jwt/verifyTokenPayment";
const router = Router();

router.post('/order',  verifyToken,createOrder);
router.get('/list_order', verifyToken, getAllOrdersByUser);
router.put('/order/:id', verifyToken, updateOrder);
router.delete('/order/:id', verifyToken, deleteOrderById);
router.get('/all_orders',verifyToken,  getAllOrdersByAdmin);
router.post('/verifyToken-payment',verifyTokenPayment, updatePayment);

export default router 