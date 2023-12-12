import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { ProductType } from '../../interface/Product';
import axios, { AxiosError } from 'axios';
import { Category } from '../../interface/Category';
import { uploadImageClodinary } from './cloudinary';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { createProduct } from '../../redux/thunks/ProductsThunk';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../spinner/Spinner';


const FormProduct = () => {
    const { handleSubmit, register, reset, } = useForm<ProductType>();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [categories, setCategories] = useState<Category[]>([]);
    const [imgProduct, setImgProduct] = useState<FormData>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getCategories = async () => {
            try {
                const { data } = await axios('http://localhost:4000/category');
                setCategories(data);
                return data
            }
            catch (error: unknown) {
                if (error instanceof AxiosError) {
                    console.log(error.response?.data)
                }
            }
        };
        getCategories()
    }, []);

    const onSubmit = handleSubmit(async (data) => {

        setIsLoading(true)
      
        
        const urlProductImage = await uploadImageClodinary(imgProduct!);
      
        const updateProduct = {
            ...data,
            image : urlProductImage
        }
        
      
        //submit a new product
        dispatch(createProduct(updateProduct))
            .then(() => {
           
                setIsLoading(false);
               
                
                //     navigate('/');
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false)
                
            })

          //form clear
          reset()  

    });
    const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        const data = new FormData();
        data.append('file', file![0]);
        data.append('upload_preset', 'Cybernook-products')
        setImgProduct(data)

    };
    return (
        <main className='w-full col-span-3 relative'>
            {isLoading  &&   <Spinner/>}
            <form action="" className='w-[95%] mx-auto md:w-[70%] lg:w-[50%] mt-4 border border-slate-400 p-4 rounded-sm'
                onSubmit={onSubmit} >
                {/* field name */}
                <div className='w-full'>
                    <label className='block w-full my-2' htmlFor="name" >Name of Product</label>
                    <input className='border border-slate-400 rounded-sm w-full p-1 focus:outline-blue-800' type="text" id='name'
                        placeholder='Name product'
                        {...register('name', { required: true })}
                    />
                </div>
                {/* field price */}
                <div className='w-full'>
                    <label className='block w-full my-2' htmlFor="price" >Price of Product</label>
                    <input className='border border-slate-400 rounded-sm w-full p-1 focus:outline-blue-800' type="text" id='price'
                        placeholder='$1,500'
                        {...register('price', { required: true })}
                    />
                </div>
                {/* field stock */}
                <div className='w-full'>
                    <label className='block w-full my-2' htmlFor="stock" >Stock total of product</label>
                    <input className='border border-slate-400 rounded-sm w-full p-1 focus:outline-blue-800' type="text" id='stock'
                        placeholder='10 pieces'
                        {...register('stock', { required: true })}
                    />
                </div>
                {/* field category */}
                <div className='w-full'>
                    <label className='block w-full my-2' htmlFor="category" >Category</label>
                    <select className='border border-slate-400 rounded-sm w-full p-1 focus:outline-blue-800' name="caregory" id="category"
                     {...register('category', { required: true })}>
                        {categories.length > 0 && categories.map(category => (
                            <option key={category.id} value={category.name}
                               >{category.name}</option>
                        ))}
                    </select>
                </div>
                {/* Field image */}
                <div className='w-full'>
                  
                    <label className='block w-full my-2' htmlFor="image" >Select an image</label>
                    <input type="file" className='border border-slate-400  w-full' id='image'
                        
                        onChange={uploadImage}
                    />

                </div>
                <button className='bg-blue-800 text-white p-2 block w-full mt-4 font-bold uppercase' type='submit'>Add Product</button>
            </form>
        </main>
    )
}

export default FormProduct