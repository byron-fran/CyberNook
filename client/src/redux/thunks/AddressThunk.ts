import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAddress, updateAddress, deleteAdress } from "../../pages/auth/api/address";
import { Address } from "../../interface/Address";

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

export const getAddressThunk = createAsyncThunk('address/get', async (token :string, {rejectWithValue}) => {
    try{
        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/address`, {

           withCredentials : true,
            headers : {
                Authorization: `Bearer ${token}`
        }} )
        return data
    }   
    catch (error : unknown) {
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
        catch (error : unknown) {
            if (axios.isAxiosError(error)) {
               
                return rejectWithValue(error.response?.data.message );
            }
        } 

})

export const deleteAddressThunk = createAsyncThunk('address/delete', async (id: string, {rejectWithValue}) => {
    try{
          await deleteAdress(id)
    }   
    catch (error : unknown) {
        if (axios.isAxiosError(error)) {
           
            return rejectWithValue(error.response?.data.message );
        }
    } 
})