import { AxiosError } from 'axios';
import { request, response } from 'express';
import { Review } from '../interfaces/Review';
import Reviews from '../models/Reviews';
import User from '../models/User';
const createReview = async (req = request, res = response) => {
    const {} : Review= req.body
    try {
        const newReview = await Reviews.create({...req.body,});
        if(!newReview){return res.status(404).json({message : 'Noy saved'})};

        return res.status(200).json(newReview)
    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            return res.status(500).json({ message: error.message })
        }
        else {
            return res.status(500).json({ message: 'Error unknown' })
        }
    }
};

const getReviewsByProduct = async (req = request, res = response) => {

    const {ProductId} = req.params
    try{
        const reviews = await Reviews.findAll({where : {ProductId, }, 
        include : User,
    
    });
        if(!reviews ){return res.status(404).json({message : "not found"})};

        return res.status(200).json(reviews)
        
    }
    catch(error : unknown){
        if(error instanceof AxiosError){
            return res.status(500).json({message : error.message})
        }
        else{
        return res.status(500).json({message : error})
        }
    }
}
export {
    createReview,
    getReviewsByProduct
}