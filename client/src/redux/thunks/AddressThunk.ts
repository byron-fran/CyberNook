import { createAsyncThunk } from "@reduxjs/toolkit";
import { cybernookApi as axios } from "../../config/api/cybernookApi";
import { createAddress, updateAddress, deleteAdress } from "../../config/adapters/address/address";
import { Address } from "../../interface/Address";
import { isAxiosError } from "axios";

export const createAddressThunk = createAsyncThunk<Address, { address: Address }, { rejectValue: string }>('address/create', async ({ address }, { rejectWithValue }) => {

    try {
        const { data } = await createAddress(address);
        return data
    }
    catch (error) {
        if (isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }
});

export const getAddressThunk = createAsyncThunk('address/get', async (_, { rejectWithValue }) => {

    try {
        const { data } = await axios.get('/address')
        return data
    }
    catch (error: unknown) {

        if (isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }
});

export const updateAddressThunk = createAsyncThunk<Address, { id: string, address: Address }, { rejectValue: string }>('address/update', async ({ id, address }, { rejectWithValue }) => {
    try {
        const { data } = await updateAddress(id, address);
        return data
    }
    catch (error: unknown) {
        if (isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }

})

export const deleteAddressThunk = createAsyncThunk('address/delete', async (id: string, { rejectWithValue }) => {
    try {
        await deleteAdress(id)
    }
    catch (error: unknown) {
        if (isAxiosError(error)) {

            return rejectWithValue(error.response?.data.message);
        }
    }
})