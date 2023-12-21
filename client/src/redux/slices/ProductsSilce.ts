import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../interface/Product";
import { Products } from "../../interface/Products";
import {
    getProductsThunk,
    getDetailProductThunk,
    clearDetailProductThunk,
    deleteProductByIdThunk,
    updateProductByIdThunk
} from "../thunks/ProductsThunk";


const initialState: Products = {
    products: [],
    isLoading: false,
    detailProduct: {
        name: '',
        category: '',
        image: '',
        price: 0,
        stock: 0,
        quantity: 0,
        id: 0

    }
}

const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductsThunk.pending, state => {
                state.isLoading = true
            })
            .addCase(getProductsThunk.fulfilled, (state, action) => {

                state.isLoading = false
                state.products = action.payload
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
            .addCase(deleteProductByIdThunk.fulfilled, (state, action: PayloadAction<number | undefined>) => {

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
                            return { ...product, ...updatedProduct  };
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
                state.detailProduct = {
                    category: '',
                    id: 0,
                    image: '',
                    name: '',
                    price: 0,
                    quantity: 0,
                    mark: '',
                    paid: false,
                    ProductId: '',
                    Reviews: [],
                    stock: 0,
                    unitPrice: 0
                }


            })


    }
});

export default ProductsSlice