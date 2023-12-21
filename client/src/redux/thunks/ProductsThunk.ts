import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductType, ProductType } from "../../interface/Product";

export const getProductsThunk = createAsyncThunk('get/product', async (_, { rejectWithValue }) => {
    try {

        const { data } = await axios('http://localhost:4000/store/products',);

        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }
});

export const getDetailProduct = createAsyncThunk('detail/product', async (id: number | string, { rejectWithValue }) => {
    try {

        const { data } = await axios(`http://localhost:4000/store/product/${id}`);

        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }
});

export const clearDetailProductThunk = createAsyncThunk('clear/product', (_, { rejectWithValue }) => {
    try {

        return
    } catch (error) {
        if (axios.isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }
})
//Crud Procducts

export const createProduct = createAsyncThunk('create/product', async (product: ProductType, { rejectWithValue }) => {
    try {

        const { data } = await axios.post('http://localhost:4000/store/product', product, {
            withCredentials: true
        });

        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }
});


//detail product
export const getDetailProductThunk = createAsyncThunk('detail/product', async (id: number | string, { rejectWithValue }) => {
    try {

        const { data } = await axios(`http://localhost:4000/store/product/${id}`)
        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }
});

export const deleteProductByIdThunk = createAsyncThunk('delete/product', async (id: number, { rejectWithValue }) => {
    try {

         await axios.delete(`http://localhost:4000/store/product/${id}`, {
            withCredentials : true
        })

        return id
    } catch (error) {
        if (axios.isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }

});
export const updateProductByIdThunk =
     createAsyncThunk<ProductType, {id : string, product : ProductType}, {rejectValue : string}>('update/product', 
     async ({id, product}, {rejectWithValue}) => {
        try {

            const {data} = await axios.put(`http://localhost:4000/store/product/${id}`, product, {
                withCredentials : true
            })
            
           return data
       } catch (error : unknown) {
           if (axios.isAxiosError(error)) {
   
               return rejectWithValue(error.response?.data.message);
           }
       }
})



