import { PayloadAction, createSlice, } from "@reduxjs/toolkit";
import { Address } from "../../interface/Address";
import { createAddressThunk, deleteAddressThunk, updateAddressThunk, getAddressThunk } from "../thunks/AddressThunk";


type AddressType = {
    address: Address,
    isLoading: boolean
}

const initialState: AddressType = {
    address: {
        city: '',
        country: '',
        exteriorNumber: 0,
        postalCode: '',
        street: '',
        id: 0
    },
    isLoading: false
}


const AddressSlice = createSlice({
    initialState,
    name: 'address',
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createAddressThunk.pending, state => {
                state.isLoading = true
            })
            .addCase(createAddressThunk.fulfilled, (state, action: PayloadAction<Address>) => {
                state.address = action.payload;
                state.isLoading = false
            })
            .addCase(createAddressThunk.rejected, state => {
                state.isLoading = false
            })

            //get Adress 
            .addCase(getAddressThunk.pending, state => {
                state.isLoading = true
            })
            .addCase(getAddressThunk.fulfilled, (state, action: PayloadAction<Address>) => {
                state.isLoading = false;
                state.address = action.payload
            })
            .addCase(getAddressThunk.rejected, state => {
                state.isLoading = false
            })
        //Update Address 
        builder
            .addCase(updateAddressThunk.pending, state => {
                state.isLoading = true
            })
            .addCase(updateAddressThunk.fulfilled, (state, action: PayloadAction<Address>) => {
                state.isLoading = false;
                state.address = action.payload

            })
            .addCase(updateAddressThunk.rejected, state => {
                state.isLoading = false
            })
        //delete address 
        builder
            .addCase(deleteAddressThunk.pending, state => {
                state.isLoading = true
            })
            .addCase(deleteAddressThunk.fulfilled, state => {
                state.isLoading = false;
                state.address = {
                    city: '',
                    country: '',
                    exteriorNumber: 0,
                    postalCode: '',
                    street: '',
                    id: 0
                }
            })
            .addCase(deleteAddressThunk.rejected, state => {
                state.isLoading = false
            })

    }
});

export default AddressSlice
