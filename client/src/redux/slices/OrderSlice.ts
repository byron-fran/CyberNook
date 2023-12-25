import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Order } from "../../types/cart/Order";
import { getAllOrdersByAdmin } from "../thunks/OrdersThunks";

type OrdersType = {
    orders : Order[],
    isLoading : boolean,
   
}

const initialState : OrdersType= {
    orders : [],
    isLoading : false,
    
};

const OrderSlice = createSlice({
    name : 'orders',
    reducers : {},
    initialState,
    extraReducers : (builder) => {
        builder
            .addCase(getAllOrdersByAdmin.pending, state => {
                state.isLoading = true
            })
            .addCase(getAllOrdersByAdmin.fulfilled, (state, action : PayloadAction<Order[]>) => {
                state.isLoading = false;
                state.orders = action.payload
            })
            .addCase(getAllOrdersByAdmin.rejected, state => {
                state.isLoading = false
            })
    }
});

export default OrderSlice