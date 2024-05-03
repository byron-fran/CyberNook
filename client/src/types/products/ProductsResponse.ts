import { ProductType } from "../../interface/Product"

export type ProductsResponse = {
    products: ProductType[]
    allProducts: ProductType[],
    totalItems: number
    currentPage: number
    totalPages: number
    nextPage: number
    previousPage: number

}