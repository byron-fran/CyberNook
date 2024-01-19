import { Order } from "../cart/Order"
import { Address } from "../../interface/Address"
import { Review } from "../../interface/Review"
export type UserType = {
    name : string,
    email : string,
    phone? : string | number,
    password : string,
    id : number | string,
    Orders? : Order[],
    Addresses? : Address[],
    Reviews? : Review[],
    isAdmin : boolean
}