import { UserType } from "../types/auth/User"

export interface Review {
    id : number,
    comment : string
    stars : number,
    likes : number,
    ProductId?: string | number,
    UserId? : number | string,
    User? : UserType,
    updatedAt? : string

}