import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Order } from "../../types/cart/Order";



export const createOrderThunk = createAsyncThunk('create_order/cart', async (order :Order, {rejectWithValue}) => {
    try {
        const {data} = await axios.post('http://localhost:4000/order', order, {
            withCredentials : true
        })
       return data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Aquí, error es de tipo AxiosError
            return rejectWithValue(error.response?.data.message );
        }
    }
})

export const getAllOrdersThunk = createAsyncThunk('orders/cart', async (_, {rejectWithValue}) => {
    try {
        const {data} = await axios('http://localhost:4000/list_order', {
            withCredentials : true
        });
        console.log(data)
        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Aquí, error es de tipo AxiosError
            return rejectWithValue(error.response?.data.message );
        }
    }
});

export const deleteOrderByIdThunk = createAsyncThunk('delete/cart', async(id : number | string, {rejectWithValue}) => {
    try {
        await axios.delete(`http://localhost:4000/order/${id}`, {
            withCredentials : true
        });
        return id
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Aquí, error es de tipo AxiosError
            return rejectWithValue(error.response?.data.message );
        }
    }
})

export  const updateOrderThunk = createAsyncThunk('update/cart', async (id :number | string, {rejectWithValue}) => {
    try {
        await axios.put(`http://localhost:4000/order/${id}`, {
            withCredentials : true
        });
        return id
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Aquí, error es de tipo AxiosError
            return rejectWithValue(error.response?.data.message );
        }
    }
} )