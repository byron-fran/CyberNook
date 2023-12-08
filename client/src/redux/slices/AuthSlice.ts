import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/auth/User";
import { Auth } from "../../interface/Auth";
import Cookies from 'js-cookie'
import { registerUserThunk, getUserProfileThunk, verifyTokenThunk, logOutUserThunk, loginUserThunk } from "../thunks/AuthThunk";

const initialState: Auth = {
    isAdmin: false,
    isAuthenticated: false,
    isLoading: false,
    error: '',
    user: {
        name: '',
        email: '',
        password: '',
        id: '',
    
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //register user
        builder
            .addCase(registerUserThunk.pending, state => {
                state.isLoading = true
            })
            .addCase(registerUserThunk.fulfilled, (state, action: PayloadAction<UserType>) => {
                state.user = action.payload,
                    state.isLoading = false,
                    state.isAuthenticated = true
            })
            .addCase(registerUserThunk.rejected, (state, action ) => {
                state.isLoading = false
                state.isAuthenticated = false
                state.error = action.payload

            }),
        //login
        builder
            .addCase(loginUserThunk.pending, state => {
                state.isLoading = true
            })
            .addCase(loginUserThunk.fulfilled, (state, action: PayloadAction<UserType>) => {
                state.user = action.payload,
                    state.isLoading = false,
                    state.isAuthenticated = true
            })
            .addCase(loginUserThunk.rejected, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = false
                state.error = action.payload

            }),
        //Log Out    
        builder
            .addCase(logOutUserThunk.pending, (state) => {
                state.isLoading = false
            })
            .addCase(logOutUserThunk.fulfilled, state => {
                Cookies.remove('token')
                state.isLoading = false
                state.isAuthenticated = false
                state.user = {
                    name: '',
                    email: '',
                    password: '',
                    id: ''
                }
            })
        //Get user Profile   
        builder
            .addCase(getUserProfileThunk.pending, (state) => {
                state.isLoading = true
                state.isAuthenticated = false
            })
            .addCase(getUserProfileThunk.fulfilled, (state, action: PayloadAction<UserType>) => {
                state.user = action.payload
                state.isAuthenticated = true
                state.isLoading = false
            })
            .addCase(getUserProfileThunk.rejected, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = false
                state.error = action.payload
            }),
            //VerifyToken
        builder
            .addCase(verifyTokenThunk.pending, (state) => {
                state.isLoading = true
                state.isAuthenticated = false
            })
            .addCase(verifyTokenThunk.fulfilled, (state, action: PayloadAction<UserType>) => {
                state.user = action.payload
                state.isAuthenticated = true
                state.isLoading = false
            })
            .addCase(verifyTokenThunk.rejected, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = false
                state.error = action.payload
            })

    }
});

export default authSlice