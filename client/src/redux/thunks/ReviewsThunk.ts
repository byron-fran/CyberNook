import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Review } from "../../interface/Review";
import { configHeaders } from "./config";


export const createReviewThunk = createAsyncThunk('create/review', async (review : Review, {rejectWithValue}) => {
    const config = configHeaders()
    try {
      
        const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/review`, review, config)      
        return data
  
    } catch (error : unknown) {
        if (axios.isAxiosError(error)) {
          
            return rejectWithValue(error.response?.data.message );
        }
    }
})

export const getReviewsByProductThunk = createAsyncThunk('get/review', async (id : string , {rejectWithValue}) => {
    try {
      
        const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/reviews/${id}`, )     
     
        return data
  
    } catch (error : unknown) {
        if (axios.isAxiosError(error)) {
          
            return rejectWithValue(error.response?.data.message );
        }
    }
})

export const getAllReviewsThunk = createAsyncThunk('getAll/review', async(_, {rejectWithValue}) => {
    const config = configHeaders()
    try {
      
    const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/reviews`, config);
    return data
  
    } catch (error : unknown) {
        if (axios.isAxiosError(error)) {
          
            return rejectWithValue(error.response?.data.message );
        }
    }
});

export const deleteReviewByIdThunk = createAsyncThunk('delete/review', async (id : string, {rejectWithValue}) => {
    const config = configHeaders()
    try {
      
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/review/${id}`, config)
        return id
      
        } catch (error : unknown) {
            if (axios.isAxiosError(error)) {
              
                return rejectWithValue(error.response?.data.message );
            }
        }
})

export const clearReviewsThunk = createAsyncThunk('clear/review', (_, {rejectWithValue}) => {
    try {
      
        return
  
    } catch (error : unknown) {
        if (axios.isAxiosError(error)) {
          
            return rejectWithValue(error.response?.data.message );
        }
    }
})
