import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk('get/users', async (_, {rejectWithValue}) => {
    try {

        const {data} = await axios.get(`http://localhost:4000/users`,  {
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

        await axios.delete(`http://localhost:4000/user/${id}`,  {
            withCredentials : true
        })
        
       return id
   } catch (error : unknown) {
       if (axios.isAxiosError(error)) {

           return rejectWithValue(error.response?.data.message);
       }
   }
})
