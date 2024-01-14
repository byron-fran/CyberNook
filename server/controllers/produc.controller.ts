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
import { Product as ProductInterface } from '../interfaces/Product';

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
    const {category, name, filter } = req.query;

    try{
        if(category === 'category') {

            const productFilterByName = await Product.findOne({
                where : {
                    name :{
                        [Op.iLike]: `%${name}%`
                    } 
                }
            })
            
            const productFilters = await Product.findAll({
                where : {
                    category :{
                        [Op.iLike]: `%${filter}%`
                    }
                }
            })
            
            if(!productFilters){ return res.status(404).json({message : 'not found'})};
            return res.status(200).json({
                product : productFilterByName,
                products : productFilters
            });

        }
        else if(category === 'name'){
            const productFilterByName = await Product.findOne({
                where : {
                    name :{
                        [Op.iLike]: `%${name}%`
                    } 
                }
            })
         
            const productFilters = await Product.findAll({
                where : {
                    name :{
                        [Op.iLike]: `%${filter}%`
                    } 
                }
            })

            if(!productFilters){ return res.status(404).json({message : 'not found'})};
            return res.status(200).json({
                product : productFilterByName,
                products : productFilters
            });
        }
        else if(category=== 'mark') {
            const productFilterByName = await Product.findOne({
                where : {
                    name :{
                        [Op.iLike]: `%${name}%`
                    } 
                }
            })
            const productFilters = await Product.findAll({
                where : {
                    mark :{
                        [Op.iLike]: `%${filter}%`
                    } 
                }
            })
           
            if(!productFilters){ return res.status(404).json({message : 'not found'})};
            return res.status(200).json({
                product : productFilterByName,
                products : productFilters
            });
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

const deleteProductById = async (req = request, res = response) => {
    const {id} = req.params
    try{
        
        const product = await Product.findByPk(id);
        if(!product){return res.status(404).json({message : "product not found"})}
        await product.destroy();
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
};
const updateProductById = async (req = request, res = response) => {
    const {name,price, stock, category, image, discount} : ProductInterface = req.body;
    const {id} = req.params;
    try{
        const productFound = await Product.findByPk(id);
        if(!productFound){return res.status(404).json({message : "Product not found"})};
        productFound.name = name;
        productFound.price = price;
        productFound.stock = stock;
        productFound.category = category;
        productFound.image = image;
        productFound.discount = discount;
        await productFound.save()

        return res.status(200).json(productFound)
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

const getProductByMark = async (req = request, res = response) => {
    const {mark}= req.params;
    console.log(req.params, 'hola')
    try{
        const productMark = await Product.findAll({where : {mark}});
        if(!productMark){ return res.status(200).json({message : "not found"})};
        return res.status(200).json(productMark)
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

export {
    createProduct,
    getProductById,
    getProducts,
    getImageProduct,
    deleteProductById,
    getProductByMark,
    updateProductById
}