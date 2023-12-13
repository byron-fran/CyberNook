import  { useState, FormEvent, ChangeEvent,  } from 'react'
import { uploadImageClodinary } from './cloudinary';
import axios, { AxiosError } from 'axios';
const FormCategory = () => {
    const [nameCategory, setNameCategory] = useState<string>('');
    const [imgCategory, setImgCategory] = useState<FormData>()
    

    const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const imgUrl = await uploadImageClodinary(imgCategory!);
        
        const updateCategory = {
            name: nameCategory,
            image: imgUrl
        };
        try {
            const { data } = await axios.post('http://localhost:4000/category', updateCategory);
            return data
        }
        catch (error: unknown) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data)
            }
        }

    }
    const uploadImage = (e :ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        const data = new FormData();
        data.append('file', file![0]);
        data.append('upload_preset', 'Categories')
        setImgCategory(data)

    };

    return (
        <main className='w-full col-span-3 relative flex items-start  justify-center mt-10'>
            <form action="" className='w-[95%] mx-auto md:w-[70%] lg:w-[50%] mt-4 border border-slate-400 p-4 rounded-sm'
             onSubmit={handleSubmit}>
                <label  className='block w-full my-2' htmlFor="name">Category Name</label>
                <input className='border border-slate-400 rounded-sm w-full p-1 focus:outline-blue-800'
                    type="text" 
                    placeholder='category name'
                    onChange={(e) => setNameCategory(e.target.value)} />

                <label className='block w-full my-2' htmlFor="image">Image</label>
                <input className='border border-slate-400 rounded-sm w-full p-1 focus:outline-blue-800'
                    type="file" id='image'
                    onChange={uploadImage} />

                <button className='bg-blue-800 text-white font-bold uppercase w-full p-2 block mt-4' type='submit'>Create Category</button>
            </form>
        </main>
    )
}

export default FormCategory