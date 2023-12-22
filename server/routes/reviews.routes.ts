import { Router } from "express";
import { createReview, getReviewsByProduct, getAllReviews, deleteReviewById } from "../controllers/reviews";
import { verifyToken } from "../jwt/verifyToken";

const router = Router();

router.get('/reviews/:ProductId', getReviewsByProduct);
router.get('/reviews', verifyToken, getAllReviews)
router.post('/review', verifyToken, createReview);
router.delete('/review/:id', verifyToken, deleteReviewById)

export default router