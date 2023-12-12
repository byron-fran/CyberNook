import  { useState } from 'react'
import { uploadImageClodinary } from './cloudinary';
import axios, { AxiosError } from 'axios';
const FormCategory = () => {
    const [nameCategory, setNameCategory] = useState<string>('');
    const [imgCategory, setImgCategory] = useState<FormData>()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const imgUrl = await uploadImageClodinary(imgCategory!);
        
        const updateCategory = {
            name: nameCategory,
            image: imgUrl.secure_url
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
    const uploadImage = (e: any) => {
        const file = e.target.files;
        const data = new FormData();

        data.append('file', file[0]);
        data.append('upload_preset', 'Categories')
        setImgCategory(data)

    };

    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <label className='block' htmlFor="name">Category Name</label>
                <input type="text" placeholder='category name'
                    onChange={(e) => setNameCategory(e.target.value)} />

                <label className='block' htmlFor="image">Image</label>
                <input type="file" id='image'
                    onChange={uploadImage} />

                <button className='bg-indigo-500 block' type='submit'>Create Category</button>
            </form>
        </div>
    )
}

export default FormCategory