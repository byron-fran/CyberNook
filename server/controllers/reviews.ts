import { AxiosError } from 'axios';
import { request, response } from 'express';
import Reviews from '../models/Reviews';
import User from '../models/User';
import Product from '../models/Product';

const createReview = async (req = request, res = response) => {

    try {
        const newReview = await Reviews.create({...req.body,});
        if(!newReview){return res.status(404).json({message : 'Noy saved'})};

        return res.status(200).json(newReview)
    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.log({ message: error.message})
            return res.status(500).json({ message: error.message })
        }
        else {
            console.log(error)
            return res.status(500).json({ message: 'Error unknown' })
        }
    }
};

const getReviewsByProduct = async (req = request, res = response) => {

    const {ProductId} = req.params;

    try{
        const reviews = await Reviews.findAll({where : {ProductId, }, 
        include : [
             Product,
             {
                model : User,
                attributes : {exclude : ['password', 'phone', ' email', '   isAdmin : boolean']}
             }
            
            ],
    
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
};

const getAllReviews = async (req = request,res = response ) => {
    try{
        
        const reviews = await Reviews.findAll({
            include :
            
            [ 
                Product, 
                { model : User,
                attributes : { include : ['name', 'id']}}
            ],
          
        });
        if(!reviews){return res.status(404).json({message  : 'not found reviews'})};

        return res.status(200).json(reviews)
    }
    catch(error : unknown){
        if(error instanceof AxiosError){
            return res.status(500).json({message : error.message})
        }
        else{
        return res.status(500).json({message : 'Error unknown'})
        }
    }
};

const deleteReviewById = async(req = request, res = response) => {
    const {id} = req.params
    try{
        const reviewFound = await Reviews.findByPk(id);
        if(!reviewFound){return res.status(404).json({message : "Not found"})};

        await reviewFound.destroy();
        return res.status(204).json({message : "delete Success"})
        
    }
    catch(error : unknown){
        if(error instanceof AxiosError){
            return res.status(500).json({message : error.message})
        }
        else{
        return res.status(500).json({message : 'Error unknown'})
        }
    }
}
export {
    createReview,
    getReviewsByProduct,
    getAllReviews,
    deleteReviewById
}