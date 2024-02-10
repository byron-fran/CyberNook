import axios, { AxiosError } from "axios"

export const uploadImageClodinary = async (info : FormData) => {
    try{
        const {data} = await axios.post(`${import.meta.env.VITE_DB_ClOUDINARY}`, info);
        return data.secure_url
    }
    catch(error : unknown){
        if(error instanceof AxiosError){
            console.log(error.response?.data)
        }
    }
}