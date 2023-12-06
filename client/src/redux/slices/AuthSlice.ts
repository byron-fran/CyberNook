import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/auth/User";
import { Auth } from "../../interface/Auth";
import Cookies from 'js-cookie'
import { registerUserThunk, getUserProfileThunk, verifyTokenThunk } from "../thunks/AuthThunk";

const initialState: Auth = {
    isAdmin: false,
    isAuthenticated: false,
    isLoading: false,
    error: '',
    user: {
        name: '',
        email: '',
        password: '',
        id: ''
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUserThunk.pending, state => {
                state.isLoading = true
            })
            .addCase(registerUserThunk.fulfilled, (state, action: PayloadAction<UserType>) => {
                state.user = action.payload,
                state.isLoading = false,
                state.isAuthenticated = true
            })
            .addCase(registerUserThunk.rejected, (state) => {
                state.isLoading = false

            }),
         builder
            .addCase(getUserProfileThunk.pending, (state) => {
                state.isLoading = true
                state.isAuthenticated = false
            })
            .addCase(getUserProfileThunk.fulfilled, (state, action : PayloadAction<UserType>) => {
                state.user = action.payload
                state.isAuthenticated = true
                state.isLoading = false
            })
            .addCase(getUserProfileThunk.rejected, (state) => {
                state.isLoading = false
            }),

        builder 
            .addCase(verifyTokenThunk.pending, (state) => {
                state.isLoading = true
                state.isAuthenticated = false
            }) 
            .addCase(verifyTokenThunk.fulfilled, (state, action : PayloadAction<UserType>) => {
                state.user = action.payload
                state.isAuthenticated = true
                state.isLoading = false
            })
            .addCase(verifyTokenThunk.rejected, state => {
                state.isLoading = false
                state.isAuthenticated = false
            })
    }
});


export default authSlice