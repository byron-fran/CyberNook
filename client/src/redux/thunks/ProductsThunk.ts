import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductType,  } from "../../interface/Product";
import { ProductsResponse } from "../../types/products/ProductsResponse";

//get products limit 10 items
export const getProductsThunk = createAsyncThunk('get/product', async (offset : number = 1, { rejectWithValue }) => {
    try {

        const { data } = await axios<ProductsResponse>(`${import.meta.env.VITE_BACKEND_URL}/store/products/?page=${offset}`,);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }
});

//get all products
export const getAllProductsThunk = createAsyncThunk('all/products', async(_, {rejectWithValue}) => {
    try {

        const { data } = await axios<ProductsResponse>(`${import.meta.env.VITE_BACKEND_URL}/store/all_products`);
      
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }
});



// get detail product
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

//clear state of product
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
//create product
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

// remove a product
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

//update product
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



