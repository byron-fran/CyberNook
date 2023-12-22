import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { ProductType } from '../../interface/Product';
import { uploadImageClodinary } from './cloudinary';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { createProduct, getDetailProductThunk, updateProductByIdThunk } from '../../redux/thunks/ProductsThunk';
import {  useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../spinner/Spinner';
import SweetAlert from '../../libs/SweetAlert';


const FormProduct = () => {
    const {listCategory : categories} = useAppSelector(state => state.category);
    const {marks} = useAppSelector(state => state.marks)
    const { products } = useAppSelector(state => state.products)
    const { handleSubmit, register, reset, setValue } = useForm<ProductType>();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [imgProduct, setImgProduct] = useState<FormData>();
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const { id } = useParams()
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getProductDetail = async () => {
            if (id) {
                const { payload: product } = await dispatch(getDetailProductThunk(id))
                setValue('name', product.name)
                setValue('price', product.price)
                setValue('stock', product.stock)
                setValue('mark', product.mark);
                setValue('category', product.category)
                setValue('image', product.image)
                return
            }
        }
        getProductDetail()

    }, [id, dispatch, setValue]);


    const onSubmit = handleSubmit(async (data) => {

        setIsLoading(true)
        const productFind = products.find(product => product.id === id);


        const urlProductImage = await uploadImageClodinary(imgProduct!);

        const updateProduct = {
            ...data,
            image: urlProductImage
        };

        if (productFind) {
            dispatch(updateProductByIdThunk({ id: id!, product: updateProduct }))
                .then(() => navigate('/admin/products'))
            return
        }

        //submit a new product
        dispatch(createProduct(updateProduct))
            .then(() => {

                setIsLoading(false);
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                    navigate('/admin/products');
                }, 3000)
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
        <main className='w-full col-span-3 relative flex items-start justify-center mt-10'>
            {isLoading && <Spinner />}
            {showAlert && (
                <SweetAlert
                    type='success'
                    title='New product has been added'
                    bgColor='white'
                    colorText='#1e40af' />
            )}

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
                {/* field mark */}
                <div className='w-full'>
                    <label className='block w-full my-2' htmlFor="mark" >Mark</label>
                    <select className='border border-slate-400 rounded-sm w-full p-1 focus:outline-blue-800' id="mark"
                        {...register('mark', { required: true })}>
                        {marks.length > 0 && marks?.map(mark => (
                            <option key={mark.id} value={mark.name}
                            >{mark.name}</option>
                        ))}
                    </select>
                </div>
                {/* field category */}
                <div className='w-full'>
                    <label className='block w-full my-2' htmlFor="category" >Category</label>
                    <select className='border border-slate-400 rounded-sm w-full p-1 focus:outline-blue-800' id="category"
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