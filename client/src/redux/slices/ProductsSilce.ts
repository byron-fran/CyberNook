import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../interface/Product";
import { Products } from "../../interface/Products";
import { getProductsThunk, getDetailProductThunk} from "../thunks/ProductsThunk";
import { Order } from "../../types/cart/Order";

const initialState : Products ={
    products : [],
    isLoading : false,
    detailProduct : {
        name : '',
        category : '',
        image : '',
        price : 0,
        stock : 0,
        quantity : 0

    }
}

const ProductsSlice = createSlice({
    name : 'products',
    initialState,
    reducers : {
        clearDetailProduct : (state) => {
            state.detailProduct = {
                name : '',
                category : '',
                image : '',
                price : 0,
                stock : 0,
                quantity : 0
            }
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(getProductsThunk.pending, state => {
                state.isLoading = true
            })
            .addCase(getProductsThunk.fulfilled, (state, action ) => {
               
                state.isLoading = false
                state.products = action.payload
            })
            .addCase(getProductsThunk.rejected, state => {
                state.isLoading = false

            })
        //detail product 
        builder
            .addCase(getDetailProductThunk.pending, state => {
                state.isLoading = true
            })
            .addCase(getDetailProductThunk.fulfilled, (state, action ) => {
                state.detailProduct = action.payload
                state.isLoading = false
            })
            .addCase(getDetailProductThunk.rejected , state => {
                state.isLoading = false
            })

        //clean 
        builder
                
    }
});
export const {clearDetailProduct} = ProductsSlice.actions
export default ProductsSlice