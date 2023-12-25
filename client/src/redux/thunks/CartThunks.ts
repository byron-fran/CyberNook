import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Order } from "../../types/cart/Order";


export const createOrderThunk = createAsyncThunk('create_order/cart', async (order : Order , {rejectWithValue}) => {
    try {
        const {data} = await axios.post('http://localhost:4000/order', order, {
            withCredentials : true
        })
        console.log(data)
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
});



export const updateOrderThunk = createAsyncThunk<number, { id: number; order: object }, { rejectValue: string }>(
    'update/cart',
    async ({ id, order }, { rejectWithValue }) => {
      try {
       const {data} = await axios.put(`http://localhost:4000/order/${id}`, order, {
          withCredentials: true,
        });
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
        const {data } =await axios.post('http://localhost:4000/verifyToken-payment', {}, {
        headers : {
            Authorization: `Bearer ${token}`
        }
        })
        return data
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