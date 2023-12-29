// import { Order } from "../types/cart/Order"
import { Order } from "../types/cart/Order"
import { Review } from "./Review"
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
    description? : string

    
}

export interface Product {
    product: ProductType | Order
}

