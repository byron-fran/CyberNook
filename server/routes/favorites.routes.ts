import { addNewFavorite, removeFromFavorite, getFavoritesByUser } from "../controllers/favorites.controller";
import { Router } from "express";
import { verifyToken } from "../jwt/verifyToken";

const router = Router()

router.post('/favorite', verifyToken, addNewFavorite)
router.get('/favorite/', verifyToken, getFavoritesByUser)
router.delete('/favorite', verifyToken, removeFromFavorite)
export default router;