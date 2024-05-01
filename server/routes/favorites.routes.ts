import { addNewFavorite, removeFromFavorite, getFavoritesByUser,checkFavorite } from "../controllers/favorites.controller";
import { Router } from "express";
import { verifyToken } from "../jwt/verifyToken";

const router = Router()

router.post('/favorite/:ProductId', verifyToken, addNewFavorite)
router.get('/favorite', verifyToken, getFavoritesByUser)
router.delete('/favorite/:ProductId', verifyToken, removeFromFavorite)
router.post('/check-favorite/:ProductId', verifyToken, checkFavorite)
export default router;