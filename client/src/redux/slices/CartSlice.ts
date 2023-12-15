import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../types/cart/Order";
import { createOrderThunk, getAllOrdersThunk, deleteOrderByIdThunk, paymentOrderThunk} from "../thunks/CartThunks";

export interface CartType  {
    cart :Order[],
    isLoading : boolean
   
}

const initialState : CartType = {
    cart : [],
    isLoading : false
   
}

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {},
    extraReducers : (builder) => {

        builder
            .addCase(getAllOrdersThunk.pending, (state) => {
                state.isLoading = true

            })
            .addCase(getAllOrdersThunk.fulfilled, (state, action : PayloadAction<Order[]> ) => {
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
            .addCase(createOrderThunk.fulfilled, (state, action : PayloadAction<Order>) => {
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
            .addCase(deleteOrderByIdThunk.fulfilled, (state, action   ) => {
             state.cart.filter(order => order.id !== action.payload)
            })
            .addCase(deleteOrderByIdThunk.rejected, state => {
                state.isLoading = false
            })
        // payment success
         builder
            .addCase(paymentOrderThunk.pending, state => {
                state.isLoading = true
            })   
            .addCase(paymentOrderThunk.fulfilled, (state, action : PayloadAction<Order[]>) => {
                state.cart = action.payload
                state.isLoading = false
            })
            .addCase(paymentOrderThunk.rejected, state => {
                state.isLoading = false
            })

    }
});


export default cartSlice


