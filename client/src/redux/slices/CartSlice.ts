import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../types/cart/Order";
import { createOrderThunk, getAllOrdersThunk, deleteOrderByIdThunk, paymentOrderThunk, paymentConfirmThunk } from "../thunks/CartThunks";

export interface CartType {
    cart: Order[],
    isLoading: boolean
    payConfirm : boolean
    errorToken : boolean
}

const initialState: CartType = {
    cart: [],
    isLoading: false,
    payConfirm : false,
    errorToken : false
    

}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(getAllOrdersThunk.pending, (state) => {
                state.isLoading = true

            })
            .addCase(getAllOrdersThunk.fulfilled, (state, action: PayloadAction<Order[]>) => {
                state.cart = action.payload
                state.isLoading = false
            })
            .addCase(getAllOrdersThunk.rejected, state => {
                state.isLoading = false
            })
        //create order    
        builder
            .addCase(createOrderThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createOrderThunk.fulfilled, (state, action: PayloadAction<Order>) => {
                state.cart.push(action.payload);
                state.isLoading = false
            })
            .addCase(createOrderThunk.rejected, state => {
                state.isLoading = false
            })
        // delete a order
        builder
            .addCase(deleteOrderByIdThunk.pending, state => {
                state.isLoading = true
            })
            .addCase(deleteOrderByIdThunk.fulfilled, (state, action) => {
                const newCart = state.cart.filter(order => order.id !== action.payload)
                state.cart = newCart
                state.isLoading = false
            })
            .addCase(deleteOrderByIdThunk.rejected, state => {
                state.isLoading = false
            })
        // payment success
        builder
            .addCase(paymentOrderThunk.pending, state => {
                state.isLoading = true
            })
            .addCase(paymentOrderThunk.fulfilled, (state, action: PayloadAction<Order[]>) => {
                state.cart = action.payload
                state.isLoading = false
            })
            .addCase(paymentOrderThunk.rejected, state => {
                state.isLoading = false
            })
        //confirm payment 
        builder
            .addCase(paymentConfirmThunk.pending, state => {
                state.isLoading = true
                state.errorToken = false
            })
            .addCase(paymentConfirmThunk.fulfilled, state => {
                state.isLoading = false
                state.payConfirm = true
                state.errorToken = false
                
            })
            .addCase(paymentConfirmThunk.rejected, (state) => {
                
                state.payConfirm = false
                state.isLoading = false
                state.errorToken = true
            })
    }
});


export default cartSlice


