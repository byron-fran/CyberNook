import { createAsyncThunk } from "@reduxjs/toolkit";
import { cybernookApi as axios } from "../../config/api/cybernookApi";
import { isAxiosError } from "axios";



export const getAllOrdersByAdmin = createAsyncThunk('get/orders', async (_, { rejectWithValue }) => {

    try {

        const { data } = await axios.get(`/all_orders`)
        return data

    } catch (error: unknown) {

        if (isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }
});

