import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserType } from "../../types/auth/User";
import { registerUser, getProfileUser, tokenVerify } from "../../pages/auth/api/auth";
import Cookie from 'js-cookie'

export const registerUserThunk = createAsyncThunk('auth/register', async (user: UserType, { rejectWithValue }) => {
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

});

export const getUserProfileThunk = createAsyncThunk('auth/profile', async (_, { rejectWithValue }) => {
    try {
        const { data } = await getProfileUser()
        return data
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            // Aquí, error es de tipo AxiosError
            return rejectWithValue(error.response?.data.message || 'Error genérico');
        }
    }
});

export const verifyTokenThunk = createAsyncThunk('auth/verify', async (_, { rejectWithValue }) => {
    try {
        const cookie = Cookie.get();
        if (cookie) {
            const { data } = await tokenVerify(cookie.token);
            return data
        }

    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            // Aquí, error es de tipo AxiosError
            return rejectWithValue(error.response?.data.message || 'Error genérico');
        }
    }
})