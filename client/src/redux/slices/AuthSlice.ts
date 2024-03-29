import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/auth/User";
import { Auth } from "../../interface/Auth";

import { 
    registerUserThunk, 
    getUserProfileThunk, 
    logOutUserThunk, 
    loginUserThunk,
    updateProfileThunk,
    deleteProfileThunk
} from "../thunks/AuthThunk";

const token = localStorage.getItem('token')


const initialState: Auth = {
    isAdmin: false,
    isAuthenticated:token ? true : false,
    isLoading: false,
    error: '',
    user: {
        name: '',
        email: '',
        password: '',
        id: '',
        Orders : [],
        Addresses :[],
        isAdmin : false
    
    },
    
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
            .addCase(registerUserThunk.fulfilled, (state, action: any) => {
                localStorage.setItem('token', action.payload.token)
                state.isLoading = false,
                state.isAuthenticated = true
                state.user = action.payload.user
                state.isAdmin = state.user.isAdmin ? true : false
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
            .addCase(loginUserThunk.fulfilled, (state, action: PayloadAction<any>) => {
                localStorage.setItem('token', action.payload.token)
                state.isLoading = false,
                state.isAuthenticated = true
                state.user = action.payload.userFound
                state.isAdmin = state.user.isAdmin ? true : false
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
          
                localStorage.removeItem('token')
                state.isLoading = false
                state.isAuthenticated = false
                state.user = {
                    name: '',
                    email: '',
                    password: '',
                    id: '',
                    Addresses : [],
                    Orders : [],
                    isAdmin : false
                }
            })
        //Get user Profile   
        builder
            .addCase(getUserProfileThunk.pending, (state) => {
                state.isLoading = true
                
            })
            .addCase(getUserProfileThunk.fulfilled, (state, action: PayloadAction<UserType>) => {
                state.user = action.payload
                state.isAuthenticated = true
                state.isLoading = false
                state.isAdmin = state.user.isAdmin ? true : false
            })
            .addCase(getUserProfileThunk.rejected, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = false
                state.error = action.payload
                localStorage.removeItem('token')
            }),
         //update data profile
         builder
            .addCase(updateProfileThunk.pending, state => {
                state.isLoading = true
            })
            .addCase(updateProfileThunk.fulfilled, (state, action : PayloadAction<UserType>)  => {
                state.user = action.payload;
                state.isLoading = false
                state.isAdmin = state.user.isAdmin ? true : false

            })
            .addCase(updateProfileThunk.rejected, state => {
                state.isLoading = false;

            })
        //delete account profile
        builder
            .addCase(deleteProfileThunk.pending, state => {
                state.isLoading = true
            })
            .addCase(deleteProfileThunk.fulfilled, state => {
                state.isLoading = false;
                state.isAuthenticated = false;
                localStorage.removeItem('token')
                state.user = {
                    name : '',
                    email : '',
                    password : '',
                    id : '',
                    phone : '',
                    isAdmin : false

                }
            })
            .addCase(deleteProfileThunk.rejected, state => {
                state.isLoading = false
            })


    }
});

export default authSlice