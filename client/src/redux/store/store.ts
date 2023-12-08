import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../slices/AuthSlice'
import cartSlice from '../slices/CartSlice';
import ProductsSlice from '../slices/ProductsSilce';

export const store = configureStore({
  reducer: {
    auth : authSlice.reducer,
    cart : cartSlice.reducer,
    products : ProductsSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch