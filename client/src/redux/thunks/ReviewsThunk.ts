import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Review } from "../../interface/Review";


export const getReviewsByProductThunk = createAsyncThunk('get/review', async (id : string | number, {rejectWithValue}) => {
    try {
      
        const {data} = await axios(`http://localhost:4000/reviews/${id}`)     
        return data
  
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

export const createReviewThunk = createAsyncThunk('create/review', async (review : Review, {rejectWithValue}) => {
    try {
      
        const {data} = await axios.post('http://localhost:4000/review', review, {
            withCredentials : true
        })      
        return data
  
    } catch (error : unknown) {
        if (axios.isAxiosError(error)) {
          
            return rejectWithValue(error.response?.data.message );
        }
    }
})