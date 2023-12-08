import { UserType } from "../types/auth/User";
import { Order } from "../types/cart/Order";

export interface Auth  {
    isAuthenticated : boolean,
    isAdmin : boolean,
    user : UserType,
    isLoading : boolean,
    error: string | unknown,
    Orders? : Order[]
};