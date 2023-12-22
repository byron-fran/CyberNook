import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getProductsByCategoryThunk, getListCategories } from "../thunks/CategoryThunks";
import { Order } from "../../types/cart/Order";
import { Category } from "../../interface/Category";

type CategoryType = {
    productByCategory : Order[],
    listCategory : Category[],
    isLoading : boolean
}

const initialState : CategoryType = {
    productByCategory : [],
    listCategory : [],
    isLoading : false
};

const CategorySlice = createSlice({
    name : 'category',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
            .addCase(getProductsByCategoryThunk.pending, state => {
                state.isLoading = true
            })
            .addCase(getProductsByCategoryThunk.fulfilled, (state, action : PayloadAction<Order[]>) => {
                state.isLoading = true,
                state.productByCategory = action.payload
            })
            .addCase(getProductsByCategoryThunk.rejected, state => {
                state.isLoading = false
            })
         builder
            .addCase(getListCategories.pending, state => {
                state.isLoading = true
            }) 
            .addCase(getListCategories.fulfilled, (state, action : PayloadAction<Category[]>) => {
                state.isLoading = false
                state.listCategory = action.payload
            })  
            .addCase(getListCategories.rejected, state => {
                state.isLoading = false
            })
    }
});

export default CategorySlice