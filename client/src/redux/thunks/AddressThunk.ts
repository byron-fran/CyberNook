import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAddress, updateAddress, deleteAdress, getAddress } from "../../pages/auth/api/address";
import { Address } from "../../interface/Address";
import { configHeaders } from "./config";


export const createAddressThunk = createAsyncThunk<Address, {address : Address}, {rejectValue : string}>('address/create', async ( {address}, {rejectWithValue}) => {
    try{
        const {data} = await createAddress(address);
        return data
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            
            return rejectWithValue(error.response?.data.message );
        }
    }
});

export const getAddressThunk = createAsyncThunk('address/get', async (_, {rejectWithValue}) => {
    try{
        const {data} = await getAddress()
        return data
    }   
    catch (error) {
        if (axios.isAxiosError(error)) {
           
            return rejectWithValue(error.response?.data.message );
        }
    } 
})
export const updateAddressThunk = createAsyncThunk< Address, {id :  string, address : Address}, {rejectValue : string}>('address/update', async({id, address}, {rejectWithValue}) => {
        try{
            const {data} = await updateAddress(id, address);
            return data
        }   
        catch (error) {
            if (axios.isAxiosError(error)) {
               
                return rejectWithValue(error.response?.data.message );
            }
        } 

})

export const deleteAddressThunk = createAsyncThunk('address/delete', async (id: string, {rejectWithValue}) => {
    try{
          await deleteAdress(id)
    }   
    catch (error) {
        if (axios.isAxiosError(error)) {
           
            return rejectWithValue(error.response?.data.message );
        }
    } 
})