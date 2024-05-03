import { createAsyncThunk } from "@reduxjs/toolkit";
import { cybernookApi as axios } from "../../config/api/cybernookApi";
import { isAxiosError } from "axios";

export const getAllMarks = createAsyncThunk('marks/get', async(_, {rejectWithValue}) => {
    try{
        const {data} = await axios.get(`/mark`);
        return data
    }
    catch (error) {
        if (isAxiosError(error)) {
            
            return rejectWithValue(error.response?.data.message );
        }
    }
});

export const getProductByMark = createAsyncThunk('marks/product', async (mark : string, {rejectWithValue}) => {
   
    try{
        const {data} = await axios.get(`/store/products/${mark}`);
        return data
    }
    catch (error) {
        if (isAxiosError(error)) {
            
            return rejectWithValue(error.response?.data.message );
        }
    }
})