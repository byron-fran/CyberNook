import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Order } from "../../types/cart/Order";
import { configHeaders } from "./config";

const config = configHeaders()

export const createOrderThunk = createAsyncThunk('create_order/cart', async (order : Order , {rejectWithValue}) => {
    try {
        const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/order`, order, config)
     
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
        const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/list_order`,config);
       
        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Aquí, error es de tipo AxiosError
            return rejectWithValue(error.response?.data.message );
        }
    }
});

export const deleteOrderByIdThunk = createAsyncThunk('delete/cart', async(id : string, {rejectWithValue}) => {
    try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/order/${id}`, config);
        return id
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Aquí, error es de tipo AxiosError
            return rejectWithValue(error.response?.data.message );
        }
    }
});



export const updateOrderThunk = createAsyncThunk<string, { id: string; order: object }, { rejectValue: string }>(
    'update/cart',
    async ({ id, order }, { rejectWithValue }) => {
      try {
       const {data} = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/order/${id}`, order, config);
        console.log(data)
        return id;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Here, error is of type AxiosError
          return rejectWithValue(error.response?.data.message);
        }
        // Handle other types of errors if needed
        throw error;
      }
    }
  );

  export const paymentOrderThunk = createAsyncThunk('payment/cart', async (orders : Order[], {rejectWithValue}) => {
    try{
        return orders
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
          // Here, error is of type AxiosError
          return rejectWithValue(error.response?.data.message);
        }
        // Handle other types of errors if needed
        throw error;
      }
  });

  export const paymentConfirmThunk = createAsyncThunk('confirm/cart', async (token : string, {rejectWithValue}) => {
    try{
        const {data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/verifyToken-payment`, {}, {
        headers : {
            Authorization: `Bearer ${token}`
        }
        })
        return data
    }
    catch (error : unknown) {
        if (axios.isAxiosError(error)) {
          // Here, error is of type AxiosError
             
          return rejectWithValue(error.response?.data.message);
      
        }
        // Handle other types of errors if needed
        throw error;
      }
  });

  export const updatePaymentConfirmThunk = createAsyncThunk('confirm-payment/cart', async (cart : Order[], {rejectWithValue}) => {
    try{
        const updatePromises = cart.map((order) => (
            axios.put(`${import.meta.env.VITE_BACKEND_URL}/order/${order.id}`, { ...order, paid: true },config)));
        await Promise.all(updatePromises);   
        return
  
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
          // Here, error is of type AxiosError
             
          return rejectWithValue(error.response?.data.message);
      
        }
        // Handle other types of errors if needed
        throw error;
      }
  })


