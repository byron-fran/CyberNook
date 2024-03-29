import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { configHeaders } from "./config";

const config  = configHeaders()

export const getAllUsers = createAsyncThunk('get/users', async (_, {rejectWithValue}) => {
    try {

        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`,  config)
        
       return data
   } catch (error : unknown) {
       if (axios.isAxiosError(error)) {

           return rejectWithValue(error.response?.data.message);
       }
   }
});

export const deleteUserByIdThunk = createAsyncThunk('delete/users', async(id :string | number, {rejectWithValue}) => {
    try {

        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user/${id}`,  config)
        
       return id
   } catch (error : unknown) {
       if (axios.isAxiosError(error)) {

           return rejectWithValue(error.response?.data.message);
       }
   }
})
