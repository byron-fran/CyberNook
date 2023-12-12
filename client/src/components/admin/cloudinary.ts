import axios, { AxiosError } from "axios"

export const uploadImageClodinary = async (info : FormData) => {
    try{
        const {data} = await axios.post('https://api.cloudinary.com/v1_1/dtvbans9e/image/upload', info);
        return data
    }
    catch(error : unknown){
        if(error instanceof AxiosError){
            console.log(error.response?.data)
        }
    }
}