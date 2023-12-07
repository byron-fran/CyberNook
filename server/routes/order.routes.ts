import { Router } from "express";
import {createOrder, deleteOrderById, updateOrder, getAllOrders} from '../controllers/order.controller'
import { verify } from "../controllers/user.controller";

const router = Router();

router.post('/order',  verify,createOrder);
router.get('/list_order', verify, getAllOrders);
router.put('/order/:id', verify, updateOrder);
router.delete('/order/:id', verify, deleteOrderById)

export default router 