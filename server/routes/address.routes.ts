import {Router} from 'express';
import { getAddress, updatAddress, createAdress } from '../controllers/address.controller';
import { verifyToken } from '../jwt/verifyToken';
const router = Router();

router.get('/address/:id', verifyToken, getAddress);
router.put('/address/:id', verifyToken, updatAddress);
router.post('/address', verifyToken, createAdress);

export default router