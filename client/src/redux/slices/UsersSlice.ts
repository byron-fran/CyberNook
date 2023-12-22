import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getAllUsers, deleteUserByIdThunk } from "../thunks/UsersThunk";
import { UserType } from "../../types/auth/User";


type UsersType = {
    users: UserType[]
    isLoading: boolean
}

const initialState: UsersType = {
    users: [],
    isLoading: false
};

const UsersSlice = createSlice({
    name: 'users',
    reducers: {},
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, state => {
                state.isLoading = true
            })
            .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<UserType[]>) => {
                state.isLoading = false;
                state.users = action.payload
            })
            .addCase(getAllUsers.rejected, state => {
                state.isLoading = false
            })
            //Delete user by id
            .addCase(deleteUserByIdThunk.pending, state => {
                state.isLoading = true
            })
            .addCase(deleteUserByIdThunk.fulfilled, (state, action) => {
        
                const usersFilters = state.users.filter(user => user.id !== action.payload);
                state.users = usersFilters
                state.isLoading = false

            })
            .addCase(deleteUserByIdThunk.rejected, state => {
                state.isLoading = false
            })
    }
});

export default UsersSlice