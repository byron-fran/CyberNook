import {Router} from 'express';
import { getAddress, updatAddress, createAdress, deleteAddress } from '../controllers/address.controller';
import { verifyToken } from '../jwt/verifyToken';
const router = Router();

router.get('/address/:id', verifyToken, getAddress);
router.put('/address/:id', verifyToken, updatAddress);
router.post('/address', verifyToken, createAdress);
router.delete('/address/:id', verifyToken, deleteAddress)
export default router