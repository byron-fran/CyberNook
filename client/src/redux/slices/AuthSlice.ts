import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/auth/User";
import { Auth } from "../../interface/Auth";
import cookie from 'js-cookie';
import {registerUserThunk } from "../thunks/AuthThunk";

const initialState : Auth =  {
    isAdmin : false,
    isAuthenticated : false,
    isLoading : false,
    error : '',
    user : {
        name : '',
        email : '',
        password : '',
        id : ''
    }
};


const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
            .addCase(registerUserThunk.pending, state => {
                state.isLoading = true
            })
            .addCase(registerUserThunk.fulfilled, (state, action : PayloadAction<UserType>) => {
                state.user = action.payload,
                state.isLoading = false,
                state.isAuthenticated = true
            })
            .addCase(registerUserThunk.rejected, (state) => {
                state.isLoading = false
                
            })
        
    }
});


export default authSlice