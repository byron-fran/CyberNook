import { AxiosError } from "axios"
import {request, response} from 'express'

const createOrderPaid = async (req  = request, res = response) => {
    try{
        
        
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