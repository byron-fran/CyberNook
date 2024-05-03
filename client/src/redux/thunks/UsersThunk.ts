import { createAsyncThunk } from "@reduxjs/toolkit";
import { cybernookApi as axios } from "../../config/api/cybernookApi";
import { isAxiosError } from "axios";

export const getAllUsers = createAsyncThunk('get/users', async (_, { rejectWithValue }) => {
    try {

        const { data } = await axios.get(`/users`)
        return data

    } catch (error: unknown) {
        if (isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }
});

export const deleteUserByIdThunk = createAsyncThunk('delete/users', async (id: string | number, { rejectWithValue }) => {

    try {

        await axios.delete(`/user/${id}`)
        return id

    } catch (error: unknown) {
        if (isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }
})
