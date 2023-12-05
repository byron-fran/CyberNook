import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserType } from "../../types/auth/User";
import { registerUser } from "../../pages/auth/api/auth";

export const registerUserThunk = createAsyncThunk('auth/register', async (user: UserType, {rejectWithValue}) => {
    try {
       const { data } = await registerUser(user);
        return data
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            // Aquí, error es de tipo AxiosError
            return rejectWithValue(error.response?.data.message || 'Error genérico');
        }
    }

})