import axios from './axios';
import { Address } from '../../../interface/Address';

export const createAddress = (address : Address) => axios.post('address', address);
export const getAddress = (id : number | string) => axios.get(`address/${id}`);
export const deleteAdress = (id : number | string) => axios.delete(`address/${id}`);
export const updateAddress = (id : number | string, address : Address) => axios.put(`address/${id}`, address);
