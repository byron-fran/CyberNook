
import { ProductType } from "./Product"

export type ProductsState ={
    products : ProductType[],
    isLoading : boolean,
    detailProduct : ProductType,
    allProducts : ProductType[],
    totalItems : number,
    currentPage : number
}