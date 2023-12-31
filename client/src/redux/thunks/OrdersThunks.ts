import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrdersByAdmin = createAsyncThunk('get/orders', async (_, {rejectWithValue}) => {
    try {

        const {data} = await axios.get(`http://localhost:4000/all_orders`,  {
            withCredentials : true
        })
        
       return data
   } catch (error : unknown) {
       if (axios.isAxiosError(error)) {

           return rejectWithValue(error.response?.data.message);
       }
   }
});

