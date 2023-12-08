import { Router } from "express";
import {createOrder, deleteOrderById, updateOrder, getAllOrders} from '../controllers/order.controller'
import { verifyToken } from "../jwt/verifyToken";
const router = Router();

router.post('/order',  verifyToken,createOrder);
router.get('/list_order', verifyToken, getAllOrders);
router.put('/order/:id', verifyToken, updateOrder);
router.delete('/order/:id', verifyToken, deleteOrderById)

export default router 