import { AxiosError } from "axios";
import Mark from "../models/Mark";
import {request, response} from 'express';
import {Op} from 'sequelize'



export const createMark = async (req = request, res = response) => {
    const {name} = req.body;
    
    try{
        
        const [foundMark, created] = await Mark.findOrCreate({
            where: {
                name
            }
        })
        if(foundMark){return res.status(200).json(foundMark)}
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

export const getAllMarks = async (req = request, res = response ) => {
    try{
        
        const marks = await Mark.findAll();
        if(marks.length) {return res.status(200).json(marks)}
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