import {request, response} from 'express'
import { AxiosError } from 'axios'
import Category from '../models/Categories'

const createCategory = async (req = request, res = response) => {

    try{
        const newCategory = await Category.create(req.body);
        if(!newCategory){ return res.status(404).json({message : 'not saved'})};
        return res.status(200).json(newCategory)
        
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

const getCategories  = async (req = request, res = response) => {
    try{
        
        const categories = await Category.findAll();
        if(!categories){return res.status(404).json({message : 'there no category'})};

        return res.status(200).json(categories)
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
    getCategories,
    createCategory
}