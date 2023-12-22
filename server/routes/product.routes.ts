import { Router } from "express";
import { createProduct, getProductById, getProducts, getImageProduct, deleteProductById, updateProductById, getProductByMark } from "../controllers/produc.controller";
import uploads from '../middlewares/UploadImage';
import { verifyToken } from "../jwt/verifyToken";


const router = Router();

router.post('/product',  uploads.single('image') , createProduct);
router.get('/products',  getProducts);
router.get('/products/:mark',getProductByMark )
router.get('/product/:id',getProductById);
router.delete('/product/:id', verifyToken, deleteProductById);
router.put('/product/:id', updateProductById)
router.get('/product_image/:fichero', getImageProduct)

export default router