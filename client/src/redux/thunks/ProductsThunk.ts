import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductType, } from "../../interface/Product";
import { ProductsResponse } from "../../types/products/ProductsResponse";
import { cybernookApi as axios } from "../../config/api/cybernookApi";
import { isAxiosError } from "axios";

//get products limit 10 items
export const getProductsThunk = createAsyncThunk<object, { offset: number, category?: string, mark? : string }, { rejectValue :string}>('get/product',

    async ({ category ,mark, offset = 1 }, { rejectWithValue }) => {

        let url = `store/products/?page=${offset}`;
        
        if(category || mark){

            if(category){
                url += `&category=${category}`
            }
            if(mark){
                url += (category !== undefined ? '&' : '') + `mark=${mark}`;
            }
        };
       
        try {

            const { data } = await axios<ProductsResponse>(`/${url}`,);
            return data;

        } catch (error) {
            if (isAxiosError(error)) {

                return rejectWithValue(error.response?.data.message);
            }
        }
    });

//get all products
export const getAllProductsThunk = createAsyncThunk('all/products', async (_, { rejectWithValue }) => {

    try {

        const { data } = await axios<ProductsResponse>(`/store/all_products`);

        return data;
    } catch (error) {
        if (isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }
});



//clear state of product
export const clearDetailProductThunk = createAsyncThunk('clear/product', (_, { rejectWithValue }) => {
    try {

        return
    } catch (error) {
        if (isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }
})


//Crud Products

//create product
export const createProduct = createAsyncThunk('create/product', async (product: ProductType, { rejectWithValue }) => {
    try {

        const { data } = await axios.post(`/store/product`, product, {
            withCredentials: true
        });

        return data
    } catch (error) {
        if (isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }
});


//detail product
export const getDetailProductThunk = createAsyncThunk('detail/product', async (id: string, { rejectWithValue }) => {

    try {

        const { data } = await axios(`/store/product/${id}`)
        return data

    } catch (error) {
        if (isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }
});

// remove a product
export const deleteProductByIdThunk = createAsyncThunk('delete/product', async (id: string, { rejectWithValue }) => {
    try {

        await axios.delete(`/store/product/${id}`)

        return id
    } catch (error) {
        if (isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }

});

//update product
export const updateProductByIdThunk =
    createAsyncThunk<ProductType, { id: string, product: ProductType }, { rejectValue: string }>('update/product',

        async ({ id, product }, { rejectWithValue }) => {

            try {

                const { data } = await axios.put(`/store/product/${id}`, product)

                return data
            } catch (error: unknown) {
                if (isAxiosError(error)) {

                    return rejectWithValue(error.response?.data.message);
                }
            }
        })



