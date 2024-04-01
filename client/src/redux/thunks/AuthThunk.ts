import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserType } from "../../types/auth/User";
import { registerUser,   logOutUser, loginUser,updateProfile, deleteProfile, getProfile } from "../../pages/auth/api/auth";

export const registerUserThunk = createAsyncThunk('auth/register', async (user: UserType, { rejectWithValue }) => {
    try {

        const { data } = await registerUser(user);

        return data
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            // Aquí, error es de tipo AxiosError
            return rejectWithValue(error.response?.data.message );
        }
    }

});
export const loginUserThunk = createAsyncThunk('auth/login', async (user : UserType, {rejectWithValue}) => {
    try{
        const {data} = await loginUser(user)
        console.log(data)
        return data
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
           
            return rejectWithValue(error.response?.data.message);
        }
    }
})

export const logOutUserThunk = createAsyncThunk('auth/logout',async (_, {rejectWithValue}) => {
    try {
        await logOutUser()
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            // Aquí, error es de tipo AxiosError
            return rejectWithValue(error.response?.data.message );
        }
    }
})
export const getUserProfileThunk = createAsyncThunk('auth/profile', async (token : string, { rejectWithValue }) => {
    try {
        const { data } = await getProfile();
       
        return data
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            // Aquí, error es de tipo AxiosError
            return rejectWithValue(error.response?.data.message );
        }
    }
});

export const updateProfileThunk = createAsyncThunk('auth/update', async(user : UserType, {rejectWithValue}) => {
    try{
     const {data} =await updateProfile( user);
     return data
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            // Aquí, error es de tipo AxiosError
            return rejectWithValue(error.response?.data.message );
        }
    }
})

export const deleteProfileThunk = createAsyncThunk('auth/delete', async (_, {rejectWithValue}) => {
    try{
        await deleteProfile()
        return 
       }
       catch (error) {
           if (axios.isAxiosError(error)) {
               // Aquí, error es de tipo AxiosError
               return rejectWithValue(error.response?.data.message );
           }
       }
})

