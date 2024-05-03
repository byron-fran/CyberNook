import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../interface/Product";
import { ProductsState } from "../../interface/Products";
import {
    getProductsThunk,
    getAllProductsThunk,
    getDetailProductThunk,
    clearDetailProductThunk,
    deleteProductByIdThunk,
    updateProductByIdThunk,

} from "../thunks/ProductsThunk";
import { ProductsResponse } from "../../types/products/ProductsResponse";


const initialState: ProductsState = {
    products: [],
    isLoading: false,
    allProducts: [],
    detailProduct: {} as ProductType,
    
    currentPage : 1,
    totalItems : 0,
    nextPage : 0,
    previousPage : 0,
    totalPages : 0 
}

const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProductsThunk.pending, state => {
                state.isLoading = true
            })
            .addCase(getAllProductsThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.allProducts = action.payload?.allProducts!
            })
            .addCase(getAllProductsThunk.rejected, state => {
                state.isLoading = false

            })
        builder
            .addCase(getProductsThunk.pending, state => {
                state.isLoading = true
            })
            .addCase(getProductsThunk.fulfilled, (state, action :PayloadAction<ProductsResponse | any >)  => {

                state.isLoading = false
                state.products = action.payload?.products || []
                state.totalItems = action.payload?.totalItems!
                state.currentPage = action.payload.currentPage
                state.nextPage = action.payload.nextPage
                state.previousPage = action.payload.previousPage
                state.totalPages = action.payload.totalPages
            })
            .addCase(getProductsThunk.rejected, state => {
                state.isLoading = false

            })

        //detail product 
        builder
            .addCase(getDetailProductThunk.pending, state => {
                state.isLoading = true
            })
            .addCase(getDetailProductThunk.fulfilled, (state, action: PayloadAction<ProductType>) => {
                state.detailProduct = action.payload
                state.isLoading = false
            })
            .addCase(getDetailProductThunk.rejected, state => {
                state.isLoading = false
            })
        //delete product by id    
        builder
            .addCase(deleteProductByIdThunk.pending, state => {
                state.isLoading = true
            })
            .addCase(deleteProductByIdThunk.fulfilled, (state, action: PayloadAction<number | string | undefined>) => {

                const prodcutsFilters = state.products.filter(product => product.id !== action.payload);
                state.products = prodcutsFilters;
                state.isLoading = false
            })
            .addCase(deleteProductByIdThunk.rejected, state => {
                state.isLoading = false
            })
        builder
            .addCase(updateProductByIdThunk.pending, state => {
                state.isLoading = true
            })
            .addCase(updateProductByIdThunk.fulfilled, (state, action: PayloadAction<ProductType>) => {
                const updatedProduct = action.payload;
                const productFound = state.products.find(product => product.id === action.payload.id)
                if (productFound) {
                    const productsUpdate = state.products.map(product => {
                        if (product.id === productFound?.id) {
                            return { ...product, ...updatedProduct };
                        }
                        return product
                    })
                    state.products = productsUpdate
                    state.isLoading = false
                }

            })
            .addCase(updateProductByIdThunk.rejected, state => {
                state.isLoading = false
            })
        //clean 
        builder
            .addCase(clearDetailProductThunk.pending, state => {
                state.isLoading = false
            })
            .addCase(clearDetailProductThunk.fulfilled, state => {
                state.detailProduct = { } as ProductType
            })
    }
});

export default ProductsSlice