// import { Order } from "../types/cart/Order"
import { UserType } from "../types/auth/User"
import { Order } from "../types/cart/Order"
import { Review } from "./Review"
import { Specs } from "./Specs"
export type ProductType = {
    id: string,
    name: string,
    quantity: number,
    price: number,
    image: string,
    paid?: boolean
    category: string,
    stock?: number,
    unitPrice?: number,
    mark?: string,
    ProductId?: number | string,
    Reviews?: Review[]
    description?: string,
    discount: number,
    createdAt?: string,
    Spec?: Specs,
    User? : UserType


}

export interface Product {
    product: ProductType | Order
}

