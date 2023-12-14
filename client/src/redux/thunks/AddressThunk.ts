import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAddress, updateAddress, deleteAdress, getAddress } from "../../pages/auth/api/address";
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

export const getAddressThunk = createAsyncThunk('address/get', async (id : number, {rejectWithValue}) => {
    try{
        const {data} = await getAddress(id)
        return data
    }   
    catch (error) {
        if (axios.isAxiosError(error)) {
           
            return rejectWithValue(error.response?.data.message );
        }
    } 
})
export const updateAddressThunk = createAsyncThunk< number, {id : number | string, address : Address}, {rejectValue : string}>('address/update', async({id, address}, {rejectWithValue}) => {
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

export const deleteAddressThunk = createAsyncThunk('address/delete', async (id: number | string, {rejectWithValue}) => {
    try{
          await deleteAdress(id)
    }   
    catch (error) {
        if (axios.isAxiosError(error)) {
           
            return rejectWithValue(error.response?.data.message );
        }
    } 
})