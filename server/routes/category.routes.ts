import { Router } from "express";
import { createCategory, getCategories } from "../controllers/category.controller";
import { createMark , getAllMarks} from "../controllers/mark.controller";

const router = Router()

router.post('/category', createCategory);
router.get('/category', getCategories);

router.post('/mark', createMark)
router.get('/mark', getAllMarks)

export default router