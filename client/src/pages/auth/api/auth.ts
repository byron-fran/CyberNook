import axios from './axios';
import { UserType } from '../../../types/auth/User';
export const registerUser = (newUser : UserType) => axios.post('register', newUser);
export const loginUser = (user : UserType) => axios.post('login', user);
export const tokenVerify = (token? : string) => axios.get('verify');
export const logOutUser = () => axios.post('logout')
export const getProfileUser = () => axios.get('profile')