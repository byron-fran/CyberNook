import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserType } from "../../types/auth/User";
import { registerUser, getProfileUser, tokenVerify, logOutUser, loginUser,updateProfile, deleteProfile  } from "../../pages/auth/api/auth";
import Cookie from 'js-cookie'

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
export const getUserProfileThunk = createAsyncThunk('auth/profile', async (_, { rejectWithValue }) => {
    try {
        const { data } = await getProfileUser()
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
     console.log(data)
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

export const verifyTokenThunk = createAsyncThunk('auth/verify', async (_, { rejectWithValue }) => {
    try {
        const cookie = Cookie.get();
        if (cookie) {
            const { data } = await tokenVerify();
            return data
        }

    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            // Aquí, error es de tipo AxiosError
            return rejectWithValue(error.response?.data.message );
        }
    }
});

