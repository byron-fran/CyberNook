import { cybernookApi as axios } from '../../api/cybernookApi';
import { UserType } from '../../../types/auth/User';
export type AuthResponse = {
    user : UserType,
    token : string
}
export const registerUser = (newUser : UserType) => axios.post<AuthResponse>('/register', newUser);
export const loginUser = (user : UserType) => axios.post<AuthResponse>('/login', user);
export const logOutUser = () => axios.post<AuthResponse>('/logout')
export const updateProfile = ( user : UserType) => axios.put<UserType>(`/profile`,user );
export const deleteProfile = () => axios.delete('/profile')
export const getProfile = () => axios.get<AuthResponse>('/verify')