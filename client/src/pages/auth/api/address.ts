import axios from './axios';
import { Address } from '../../../interface/Address';

export const createAddress = (address : Address) => axios.post('address', address);
export const getAddress = (id : string) => axios.get(`address/${id}`);
export const deleteAdress = (id : string) => axios.delete(`address/${id}`);
export const updateAddress = (id : string, address : Address) => axios.put(`address/${id}`, address);
