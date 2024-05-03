import { createAsyncThunk } from "@reduxjs/toolkit";
import { cybernookApi as axios } from "../../config/api/cybernookApi";
import { isAxiosError } from "axios";

export const getProductsByCategoryThunk = createAsyncThunk('category/get', async(category : string, {rejectWithValue}) => {
    try{
        const {data} = await axios.get(`/category/${category}`);
        return data
    }
    catch (error) {
        if (isAxiosError(error)) {
            
            return rejectWithValue(error.response?.data.message );
        }
    }
});

export const getListCategories = createAsyncThunk('list/category', async (_, {rejectWithValue}) => {
    
    try{
        const {data} = await axios.get(`/category`);
        return data
    }
    catch (error) {
        if (isAxiosError(error)) {
            
            return rejectWithValue(error.response?.data.message );
        }
    }
})

export const cleanCategoryList = createAsyncThunk('category/clean', async (_, {rejectWithValue}) => {
    try {

        return
    } catch (error) {
        if (isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }
})