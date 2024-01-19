// import { Order } from "../types/cart/Order"
import { Order } from "../types/cart/Order"
import { Review } from "./Review"
import { Specs } from "./Specs"
export type ProductType = {
    name: string,
    quantity: number,
    price: number,
    image: string,
    paid?: boolean
    category: string,
    stock?: number,
    id: number  | string,
    unitPrice? : number,
    mark? : string,
    ProductId? : number | string,
    Reviews? : Review[]
    description? : string,
    discount : number,
    createdAt? : string,
    Spec? : Specs

    
}

export interface Product {
    product: ProductType | Order
}

