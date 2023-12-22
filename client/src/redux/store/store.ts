import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../slices/AuthSlice'
import cartSlice from '../slices/CartSlice';
import ProductsSlice from '../slices/ProductsSilce';
import AddressSlice from '../slices/Adress';
import CategorySlice from '../slices/CategorySlice';
import ReviewSlice from '../slices/ReviewSlice';
import OrderSlice from '../slices/OrderSlice';
import UsersSlice from '../slices/UsersSlice';
import MarkSclice from '../slices/MarksSlice';

export const store = configureStore({
  reducer: {
    auth : authSlice.reducer,
    cart : cartSlice.reducer,
    products : ProductsSlice.reducer,
    address : AddressSlice.reducer,
    category : CategorySlice.reducer,
    reviews : ReviewSlice.reducer,
    orders : OrderSlice.reducer,
    users : UsersSlice.reducer,
    marks : MarkSclice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch