import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const getProductsByCategoryThunk = createAsyncThunk('category/get', async(category : string, {rejectWithValue}) => {
    try{
        const {data} = await axios(`http://localhost:4000/category/${category}`);
        return data
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            
            return rejectWithValue(error.response?.data.message );
        }
    }
});

export const getListCategories = createAsyncThunk('list/category', async (_, {rejectWithValue}) => {
    try{
        const {data} = await axios('http://localhost:4000/category');
        return data
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            
            return rejectWithValue(error.response?.data.message );
        }
    }
})