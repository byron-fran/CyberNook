import { Router } from "express";
import { createProduct, getProductById, getProducts, deleteProductById, updateProductById,getAllProducts } from "../controllers/products.controller";
import uploads from '../middlewares/UploadImage';
import { verifyToken } from "../jwt/verifyToken";


const router = Router();

router.post('/product',  uploads.single('image') , createProduct);
router.get('/product/:id',getProductById);
router.delete('/product/:id', verifyToken, deleteProductById);
router.put('/product/:id', updateProductById),
router.get('/all_products', getAllProducts),
router.get('/products', getProducts)


export default router