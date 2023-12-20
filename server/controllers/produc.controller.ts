import {request, response} from 'express';
import Product from '../models/Product';
import { AxiosError } from 'axios';
import { Product as P } from '../interfaces/Product';
import Category from '../models/Categories';
import { CategoryInterface } from '../interfaces/Category';
import fs from 'fs'
import path from 'path';
import { Op, } from 'sequelize';
import Reviews from '../models/Reviews';

const createProduct = async (req = request, res = response) => {
    const {name,  price, category, stock, image,  }  = req.body
    const  file = req.file
    try{
        // console.log(image)
     
        const newProduct  = await Product.create(req.body)
        
        if(!newProduct){return res.status(404).json({error : 'No saved product'})};
    
        return res.status(200).json(newProduct)
    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {

          return res.status(500).json({ error: (error as AxiosError).message });
        } else {
  
          return res.status(500).json({ error: error });
        }
    }  
    
};


const getProductById = async (req = request, res = response) => {
    const {id} = req.params;
    try{
        const productFind = await Product.findByPk(id, {
            include : Reviews
        });
        if(!productFind){return res.status(404).json({ error : `Product ${id} does not exist`})};

        return res.status(200).json(productFind)

    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {

          return res.status(500).json({ error: (error as AxiosError).message });
        } else {
  
          return res.status(500).json({ error: error});
        }
    }  

};

const getProducts = async (req = request, res = response) => {
    const {name,filter } = req.query;

  
  
    try{
        if(filter === 'category') {
            
            const productFilters = await Product.findAll({
                where : {
                    category :{
                        [Op.iLike]: `%${name}%`
                    }
                }
            })
            if(!productFilters){ return res.status(404).json({message : 'not found'})};
            return res.status(200).json(productFilters);

        }
        else if(filter === 'name'){
         
            const productFilters = await Product.findAll({
                where : {
                    name :{
                        [Op.iLike]: `%${name}%`
                    } 
                }
            })
            if(!productFilters){ return res.status(404).json({message : 'not found'})};
            return res.status(200).json(productFilters);
        }
        else if(filter === 'mark') {
            const productFilters = await Product.findAll({
                where : {
                    mark :{
                        [Op.iLike]: `%${name}%`
                    } 
                }
            })
            if(!productFilters){ return res.status(404).json({message : 'not found'})};
            return res.status(200).json(productFilters);
        }

        const products = await Product.findAll();
        if(!products){return res.status(404).json({error : 'there not products'})};
        //console.log(products)
        return res.status(200).json(products)
    }
    catch (error: any) {
        if (error instanceof AxiosError) {

          return res.status(500).json({ error: (error as AxiosError).message });
        } else {
  
          return res.status(500).json({ error: error });
        }
    }   
}



const getImageProduct = (req = request, res = response) => {
    const {fichero} = req.params;
    //console.log(fichero)
    let ruta = './uploads/'+fichero;
    //console.log(ruta)
    fs.stat(ruta, (error, exist) => {
        if(exist){
            return res.sendFile(path.resolve(ruta));
        }
        else{
            return res.status(404).json({
                error : "El imagen no se pudo encontrar"
           })
        }
    })
};

export {
    createProduct,
    getProductById,
    getProducts,
    getImageProduct
}