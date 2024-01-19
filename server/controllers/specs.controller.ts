import { Specs as SpecsInterface } from "../interfaces/Specs"
import { Request, Response } from "express"
import Spces from "../models/Specs"
import { AxiosError } from "axios";


const createSpecs = async   (req : Request, res : Response) =>{
    const {ProductId, model, ram, memory, color, size, weight, mesasures}  = req.body;
    console.log(req.body)
    try{
        
        const specs = await Spces.create(req.body);
        if(!specs){
            return res.status(404).json({message : "cannot create specs"})
        }
        return res.status(200).json(specs)
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

const getSpecsByProduct = async ( req : Request, res : Response) =>{
    console.log(req.params.ProductId, 'desde los params')
    try{
        
        const specs = await Spces.findOne({where : {id : req.params.ProductId}});
        if(!specs){
            return res.status(404).json({message : "cannot get specs"})
        }
        return res.status(200).json(specs)
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

const deleteSpecsById = async ( req : Request, res : Response) =>{
    try{
        
        const specs = await Spces.destroy({where : {id : req.params.id}});
        if(!specs){
            return res.status(404).json({message : "cannot delete specs"})
        }
        return res.status(200).json({message : "deleted"})
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

const updateSpecs = async (req : Request, res : Response) => {
    try{
        
        const specs = await Spces.update(req.body, {where : {id : req.params.id}});
        if(!specs){
            return res.status(404).json({message : "cannot update specs"})
        }
        return res.status(200).json({message : "updated"})
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

export {
    createSpecs,
    getSpecsByProduct,
    deleteSpecsById,
    updateSpecs
}