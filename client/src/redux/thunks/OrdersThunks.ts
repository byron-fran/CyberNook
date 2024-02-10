import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { configHeaders } from "./config";

const config = configHeaders()

export const getAllOrdersByAdmin = createAsyncThunk('get/orders', async (_, {rejectWithValue}) => {
    try {

        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/all_orders`, config)
        
       return data
   } catch (error : unknown) {
       if (axios.isAxiosError(error)) {

           return rejectWithValue(error.response?.data.message);
       }
   }
});

