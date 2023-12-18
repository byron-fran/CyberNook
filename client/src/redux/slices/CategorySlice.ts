import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getProductsByCategoryThunk } from "../thunks/CategoryThunks";
import { Order } from "../../types/cart/Order";

type CategoryType = {
    productByCategory : Order[],
    listCategory : string[],
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
    }
});

export default CategorySlice