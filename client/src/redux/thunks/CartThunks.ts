import { cybernookApi as axios } from "../../config/api/cybernookApi";
import { isAxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Order } from "../../types/cart/Order";


export const createOrderThunk = createAsyncThunk('create_order/cart', async (order: Order, { rejectWithValue }) => {

  try {

    const { data } = await axios.post(`/order`, order)
    return data

  } catch (error) {
    if (isAxiosError(error)) {
      // Aquí, error es de tipo AxiosError
      return rejectWithValue(error.response?.data.message);
    }
  }
})

export const getAllOrdersThunk = createAsyncThunk('orders/cart', async (_, { rejectWithValue }) => {

  try {

    const { data } = await axios(`/list_order`)
    return data

  } catch (error) {
    if (isAxiosError(error)) {
      // Aquí, error es de tipo AxiosError
      return rejectWithValue(error.response?.data.message);
    }
  }
});

export const deleteOrderByIdThunk = createAsyncThunk('delete/cart', async (id: string, { rejectWithValue }) => {
  try {

    await axios.delete(`/order/${id}`);
    return id

  } catch (error) {
    if (isAxiosError(error)) {
      // Aquí, error es de tipo AxiosError
      return rejectWithValue(error.response?.data.message);
    }
  }
});



export const updateOrderThunk = createAsyncThunk<string, { id: string; order: object }, { rejectValue: string }>(
  'update/cart',
  async ({ id, order }, { rejectWithValue }) => {

    try {

      await axios.put(`/order/${id}`, order,);
      return id;

    } catch (error) {
      if (isAxiosError(error)) {
        // Here, error is of type AxiosError
        return rejectWithValue(error.response?.data.message);
      }
      // Handle other types of errors if needed
      throw error;
    }
  }
);

export const paymentOrderThunk = createAsyncThunk('payment/cart', async (orders: Order[], { rejectWithValue }) => {

  try {

    return orders
  }
  catch (error) {
    if (isAxiosError(error)) {
      // Here, error is of type AxiosError
      return rejectWithValue(error.response?.data.message);
    }
    // Handle other types of errors if needed
    throw error;
  }
});

export const paymentConfirmThunk = createAsyncThunk('confirm/cart', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/verifyToken-payment`)
    return data
  }
  catch (error: unknown) {
    if (isAxiosError(error)) {
      // Here, error is of type AxiosError

      return rejectWithValue(error.response?.data.message);

    }
    // Handle other types of errors if needed
    throw error;
  }
});

export const updatePaymentConfirmThunk = createAsyncThunk('confirm-payment/cart', async (cart: Order[], { rejectWithValue }) => {
  try {

    const updatePromises = cart.map((order) => (
      axios.put(`/order/${order.id}`, { ...order, paid: true })));

    await Promise.all(updatePromises);
    
    return

  }
  catch (error) {
    if (isAxiosError(error)) {
      // Here, error is of type AxiosError

      return rejectWithValue(error.response?.data.message);

    }
    // Handle other types of errors if needed
    throw error;
  }
})


