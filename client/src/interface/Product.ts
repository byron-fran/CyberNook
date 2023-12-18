import { Order } from "../types/cart/Order"
export type ProductType = {
    name: string,
    quantity: number,
    price: number,
    image: string,
    paid?: boolean
    category: string,
    stock?: number,
    id? : number | string,
    unitPrice? : number,
    mark? : string

    
}

export interface Product {
    product: ProductType | Order
}

