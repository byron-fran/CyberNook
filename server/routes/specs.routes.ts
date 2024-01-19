import { createSpecs, getSpecsByProduct, deleteSpecsById, updateSpecs} from '../controllers/specs.controller';
import { Router } from 'express';
import { verifyToken } from '../jwt/verifyToken';

const router = Router();

router.post('/specs', verifyToken, createSpecs);
router.get('/specs/:ProductId', verifyToken, getSpecsByProduct);
router.delete('/specs/:id', verifyToken, deleteSpecsById);
router.put('/specs/:id', verifyToken, updateSpecs);

export default router


