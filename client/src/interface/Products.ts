
import { ProductType } from "./Product"

export type ProductsState ={
    isLoading : boolean,
    detailProduct : ProductType,

    products: ProductType[]
    allProducts: ProductType[],
    totalItems: number
    currentPage: number
    totalPages: number
    nextPage: number
    previousPage: number

}