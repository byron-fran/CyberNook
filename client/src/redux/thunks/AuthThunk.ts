import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserType } from "../../types/auth/User";

export const registerUserThunk = createAsyncThunk('auth/register', async (user: UserType) => {
    try {
       const { data } = await axios.post('http://localhost:4000/register', user);
       console.log(data, 'todo salio bien')
        return data
    }
    catch (error) {
        console.log(error);
        return error
    }

})