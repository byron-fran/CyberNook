import { AxiosError } from "axios"
import { request, response } from "express"
import Address from "../models/Address"
import User from "../models/User";

const createAdress = async (req = request, res = response) => {
   
    try{
        console.log(req.body)
        const newAdress = await Address.create(req.body)
        if(!newAdress){return res.status(404).json({message : 'address not save'})};

        return res.status(200).json(newAdress)
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


const updatAddress = async (req = request, res = response) => {
    const {id} = req.params
    const {street, city, country, postalCode, exteriorNumber} = req.body;
    try{
        const addressFound = await Address.findOne({where : {id}});
        if(!addressFound){return res.status(404).json({message : 'Address not found'})};

        addressFound.street =street;
        addressFound.city = city;
        addressFound.country = country;
        addressFound.postalCode = postalCode;
        addressFound.exteriorNumber = exteriorNumber;
        addressFound.save();

        return res.status(200).json(addressFound)
        
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

const getAddress = async (req = request, res = response) => {
    const {id} = req.params;
    try{
        const address = await Address.findByPk(id);
        if(!address){return res.status(404).json({message : 'address no found'})}
      
        return res.status(200).json(address)
        
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

const deleteAddress = async ( req = request, res = response) => {
    const {id} = req.params;
    

    try{
        const addressId = await Address.findOne({where : {id}})  ;
        if(!addressId){return res.status(404).json({message : 'address not found'})};
        addressId.destroy();
        return res.status(204)
        
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
    createAdress,
    updatAddress,
    getAddress,
    deleteAddress
}