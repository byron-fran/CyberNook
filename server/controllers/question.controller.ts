import { Request, Response } from "express";
import Question from "../models/Question";
import { AxiosError } from "axios";
const createQuestion = async (req: Request, res: Response) => {

    const { email, description } = req.body
    try {
        const question = await Question.create(req.body)
        return res.status(200).json({ message: 'success', question })
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return res.status(404).json({ message: error.response?.data })
        }
        return res.status(500).json({ message: 'Error unknown' })
    }
};

export {
    createQuestion
}