import { UserType } from "../types/auth/User"
export interface Auth  {
    isAuthenticated : boolean,
    isAdmin : boolean,
    user : UserType,
    isLoading : boolean,
    error: string | unknown
};