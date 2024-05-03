import { createAsyncThunk } from "@reduxjs/toolkit";
import { Review } from "../../interface/Review";
import { cybernookApi as axios } from "../../config/api/cybernookApi";
import { isAxiosError } from "axios";

export const createReviewThunk = createAsyncThunk('create/review', async (review: Review, { rejectWithValue }) => {

    try {

        const { data } = await axios.post(`/review`, review)
        console.log(data, 'review')
        return data

    } catch (error: unknown) {
        if (isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }
})

export const getReviewsByProductThunk = createAsyncThunk('get/review', async (id: string, { rejectWithValue }) => {
    try {

        const { data } = await axios(`/reviews/${id}`)

        return data

    } catch (error: unknown) {
        if (isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }
})

export const getAllReviewsThunk = createAsyncThunk('getAll/review', async (_, { rejectWithValue }) => {

    try {

        const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/reviews`);
        return data

    } catch (error: unknown) {
        if (isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }
});

export const deleteReviewByIdThunk = createAsyncThunk('delete/review', async (id: string, { rejectWithValue }) => {

    try {

        await axios.delete(`/review/${id}`)
        return id

    } catch (error: unknown) {
        if (isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }
})

export const clearReviewsThunk = createAsyncThunk('clear/review', (_, { rejectWithValue }) => {
    try {

        return

    } catch (error: unknown) {
        if (isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }
})
