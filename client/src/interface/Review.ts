import { UserType } from "../types/auth/User"
import { ProductType } from "./Product"
export interface Review {
    id : string,
    comment : string
    stars : number,
    likes : number,
    ProductId?: string | number,
    UserId? : number | string,
    User? : UserType,
    updatedAt? : string,
    Product? : ProductType,
   
}