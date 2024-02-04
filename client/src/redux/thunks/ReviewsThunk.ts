import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Review } from "../../interface/Review";

export const createReviewThunk = createAsyncThunk('create/review', async (review : Review, {rejectWithValue}) => {
    try {
      
        const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/review`, review, {
            withCredentials : true
        })      
        return data
  
    } catch (error : unknown) {
        if (axios.isAxiosError(error)) {
          
            return rejectWithValue(error.response?.data.message );
        }
    }
})

export const getReviewsByProductThunk = createAsyncThunk('get/review', async (id : string , {rejectWithValue}) => {
    try {
      
        const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/reviews/${id}`)     
        return data
  
    } catch (error : unknown) {
        if (axios.isAxiosError(error)) {
          
            return rejectWithValue(error.response?.data.message );
        }
    }
})

export const getAllReviewsThunk = createAsyncThunk('getAll/review', async(_, {rejectWithValue}) => {
    try {
      
    const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/reviews`, {
        withCredentials : true
    });
    return data
  
    } catch (error : unknown) {
        if (axios.isAxiosError(error)) {
          
            return rejectWithValue(error.response?.data.message );
        }
    }
});

export const deleteReviewByIdThunk = createAsyncThunk('delete/review', async (id : string, {rejectWithValue}) => {
    try {
      
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/review/${id}`, {
            withCredentials : true
        })
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
