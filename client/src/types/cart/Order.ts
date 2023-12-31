import { UserType } from "../auth/User";
export interface Order  {
    updatedAt?: string | number | Date;
    name : string,
    quantity : number,
    price : number,
    image : string,
    paid : boolean,
    category? : string,
    stock?: number,
    unitPrice: number,
    id? : number,
    mark? : string,
    ProductId? : string | number,
    User? : UserType
    
}