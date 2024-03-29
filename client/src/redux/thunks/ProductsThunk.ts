import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductType,  } from "../../interface/Product";

export type ProductsResponse = {
    products : ProductType[],
    totalItems : number,
    currentPage : number
}
export const getProductsThunk = createAsyncThunk('get/product', async (_, { rejectWithValue }) => {
    try {

        const { data } = await axios<ProductsResponse>(`${import.meta.env.VITE_BACKEND_URL}/store/products`,);

        console.log(data)
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            
            return rejectWithValue(error.response?.data.message);
        }
    }
});

export const getDetailProduct = createAsyncThunk('detail/product', async (id: string, { rejectWithValue }) => {
    try {

        const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/store/product/${id}`);

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

        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/store/product`, product, {
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
export const getDetailProductThunk = createAsyncThunk('detail/product', async (id:  string, { rejectWithValue }) => {
    try {

        const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/store/product/${id}`)
        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }
});

export const deleteProductByIdThunk = createAsyncThunk('delete/product', async (id: string, { rejectWithValue }) => {
    try {

         await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/store/product/${id}`, {
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

            const {data} = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/store/product/${id}`, product, {
                withCredentials : true
            })
            
           return data
       } catch (error : unknown) {
           if (axios.isAxiosError(error)) {
   
               return rejectWithValue(error.response?.data.message);
           }
       }
})



