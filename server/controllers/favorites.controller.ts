import {request, response } from 'express';
import { AxiosError } from 'axios';
import Product from '../models/Product';
import User from '../models/User';


const addNewFavorite = async ( req = request, res = response) => {

    const {UserId, ProductId} = req.body;

    try{
        const user  = await User.findByPk(UserId)
        const product = await Product.findByPk(ProductId)

        if(!product || !user){
            return res.status(404).json({ message : "Not found"})

        }
        await user.$add('Product', product)

        return res.status(200).json({ message: 'Product add  your favorite' });
    } 
    catch(error : unknown){
        if(error instanceof AxiosError){
            console.log(error)
            return res.status(500).json({message : error.message})

            
        }
        else{
            console.log(error)
        return res.status(500).json({message : error})
        }
    }
}
const getFavoritesByUser = async (req = request, res = response) => {

    const {UserId} = req.body;
    try{
        const user  = await User.findByPk(UserId)
        const favorites = await user?.$get('products');
        if(favorites?.length === 0){return res.status(202).json([])}

        return res.status(200).json(favorites)
        
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
const removeFromFavorite = async ( req = request, res = response) => {
    
    const {UserId, ProductId} = req.body;

    try{
        
        const user  = await User.findByPk(UserId)
        const product = await Product.findByPk(ProductId)
        if(!product || !user){
            return res.status(404).json({ message : "Not found"})

        }
        await user.$remove('Product', product);

        return res.status(200).json({ message: 'Your favorite has been delete ' });
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
    addNewFavorite,
    removeFromFavorite,
    getFavoritesByUser
}