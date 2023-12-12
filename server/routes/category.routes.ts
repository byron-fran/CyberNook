import { Router } from "express";
import { createCategory, getCategories } from "../controllers/category.controller";

const router = Router()

router.post('/category', createCategory);
router.get('/category', getCategories);


export default router