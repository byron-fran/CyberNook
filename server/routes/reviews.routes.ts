import { Router } from "express";
import { createReview, getReviewsByProduct } from "../controllers/reviews";
import { verifyToken } from "../jwt/verifyToken";

const router = Router();

router.get('/reviews/:ProductId', getReviewsByProduct)
router.post('/review', verifyToken, createReview)

export default router