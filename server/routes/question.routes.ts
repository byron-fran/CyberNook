import { Router } from "express";
import { createQuestion } from "../controllers/question.controller";

const router = Router();

router.post('/question', createQuestion);

export default router