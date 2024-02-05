import { UserType } from "../auth/User";
export interface Order {
    id?: string,
    updatedAt?: string | number | Date,
    name: string,
    quantity: number,
    price: number,
    image: string,
    paid: boolean,
    category?: string,
    stock?: number,
    unitPrice: number,
    mark?: string,
    discount: number,
    ProductId?: string | number,
    User?: UserType

}