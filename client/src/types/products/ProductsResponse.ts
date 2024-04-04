import { ProductType } from "../../interface/Product"

export type ProductsResponse = {
    products : ProductType[],
    totalItems : number,
    currentPage : number,
    allProducts : ProductType[],
    product : ProductType
}