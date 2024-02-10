import axios from "axios";


const token =  localStorage.getItem('token')
const instance = axios.create({
    baseURL : `${import.meta.env.VITE_BACKEND_URL}/`,
    withCredentials : true,
    headers : {
        Authorization: `Bearer ${token}`
    }} )

;

export default instance
