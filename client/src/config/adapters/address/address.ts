import { cybernookApi as axios } from '../../api/cybernookApi';
import { Address } from '../../../interface/Address';

export const createAddress = (address : Address) => axios.post('address', address);
export const deleteAdress = (id : string) => axios.delete(`address/${id}`);
export const updateAddress = (id : string, address : Address) => axios.put(`address/${id}`, address);
