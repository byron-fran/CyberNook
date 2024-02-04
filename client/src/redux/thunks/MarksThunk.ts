import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllMarks = createAsyncThunk('marks/get', async(_, {rejectWithValue}) => {
    try{
        const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/mark`);
        return data
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            
            return rejectWithValue(error.response?.data.message );
        }
    }
});

export const getProductByMark = createAsyncThunk('marks/product', async (mark : string, {rejectWithValue}) => {
   
    try{
        const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/store/products/${mark}`);
        return data
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            
            return rejectWithValue(error.response?.data.message );
        }
    }
})