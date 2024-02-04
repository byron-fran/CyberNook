import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk('get/users', async (_, {rejectWithValue}) => {
    try {

        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`,  {
            withCredentials : true
        })
        
       return data
   } catch (error : unknown) {
       if (axios.isAxiosError(error)) {

           return rejectWithValue(error.response?.data.message);
       }
   }
});

export const deleteUserByIdThunk = createAsyncThunk('delete/users', async(id :string | number, {rejectWithValue}) => {
    try {

        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user/${id}`,  {
            withCredentials : true
        })
        
       return id
   } catch (error : unknown) {
       if (axios.isAxiosError(error)) {

           return rejectWithValue(error.response?.data.message);
       }
   }
})
