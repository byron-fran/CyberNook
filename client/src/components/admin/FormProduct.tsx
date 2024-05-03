import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { ProductType } from '../../interface/Product';
import { uploadImageClodinary } from './cloudinary';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { createProduct, getDetailProductThunk, updateProductByIdThunk } from '../../redux/thunks/ProductsThunk';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../spinner/Spinner';
import { AxiosError } from 'axios';

const FormProduct = () => {

    const { listCategory: categories } = useAppSelector(state => state.category);
    const { marks } = useAppSelector(state => state.marks)
    const { products } = useAppSelector(state => state.products)
    const { handleSubmit, register, reset, setValue, formState: { errors } } = useForm<ProductType>();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [imgProduct, setImgProduct] = useState<FormData>();
    const [specId, setSpecId] = useState<string>('')

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
                setValue('description', product.description)
                setValue('discount', product.discount)
                setSpecId(product.Spec.id)
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
            image: urlProductImage,
            discount: Number(data.discount)
        };

        if (productFind) {

            dispatch(updateProductByIdThunk({ id: id!, product: updateProduct }))
                .then(() => navigate('/admin/products'))
            return
        }

        //submit a new product
        dispatch(createProduct(updateProduct))
            .then((data) => {

                setIsLoading(false);

                setTimeout(() => {

                    navigate(`/admin/create-specs/${data.payload.id}`);
                }, 3000)
            })
            .catch((error: unknown) => {
                if (error instanceof AxiosError) {
                    console.log(error.response)
                }

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

        <main className='w-full col-span-3 relative flex items-start justify-center pt-10 md:h-[85vh] overflow-y-scroll no-scrollbar'>
            {isLoading && <Spinner />}
            {id && (
                <div className='flex justify-center md:justify-end w-full absolute md:right-[3rem] top-2'>
                    <div className='flex gap-2 items-center bg-blue-800 rounded-md p-2 cursor-pointer ' onClick={() => {

                        navigate(`/admin/update-specs/${id}/${specId}`)
                    }}>
                        <img src="/images/edit-white.png" className='w-[20px] h-[20px] cursor-pointer' alt="" />
                        <p className=' text-white ' >Update specs</p>
                    </div>

                </div>
            )}

            <form action="" className='w-[95%] mx-auto md:w-[70%] lg:w-[50%] mt-4 border border-slate-400 p-4 rounded-sm'
                onSubmit={onSubmit} >
                {/* field name */}
                <div className='w-full'>
                    <label className='block w-full my-2' htmlFor="name" >Name of Product</label>
                    {errors.name?.type === 'required' && <p className='text-red-500'>Name required</p>}
                    <input className='border border-slate-400 rounded-sm w-full p-1 focus:outline-blue-800' type="text" id='name'
                        placeholder='Name product'
                        {...register('name', { required: true })}
                    />
                </div>
                {/* field price */}
                <div className='w-full'>
                    <label className='block w-full my-2' htmlFor="price" >Price of Product</label>
                    {errors.price?.type === 'required' && <p className='text-red-500'>Price required</p>}
                    {errors.price?.type === 'min' && <p className='text-red-500'>Price min 1</p>}
                    {errors.price?.type === 'pattern' && <p className='text-red-500'>Must be a number</p>}
                    <input className='border border-slate-400 rounded-sm w-full p-1 focus:outline-blue-800' type="text" id='price'
                        placeholder='$1,500'
                        {...register('price', {
                            required: true, min: 1, pattern: {
                                value: /^[0-9]*$/,
                                message: 'Must be a number'
                            }
                        })}
                    />
                </div>
                {/* field stock */}
                <div className='w-full'>
                    <label className='block w-full my-2' htmlFor="stock" >Stock total of product</label>
                    {errors.stock?.type === 'required' && <p className='text-red-500'>Stock required</p>}
                    {errors.stock?.type === 'min' && <p className='text-red-500'>Stock min 1</p>}
                    {errors.stock?.type === 'pattern' && <p className='text-red-500'>Must be a number</p>}
                    <input className='border border-slate-400 rounded-sm w-full p-1 focus:outline-blue-800' type="text" id='stock'
                        placeholder='10 pieces'
                        {...register('stock', {
                            required: true, min: 1, pattern: {
                                value: /^[0-9]*$/,
                                message: 'Must be a number'
                            }
                        })}
                    />
                </div>
                {/* field mark */}
                <div className='w-full'>
                    <label className='block w-full my-2' htmlFor="mark" >Mark</label>
                    {errors.mark?.type === 'required' && <p className='text-red-500'>Mark required</p>}

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
                    {errors.category?.type === 'required' && <p className='text-red-500'>Category required</p>}
                    <select className='border border-slate-400 rounded-sm w-full p-1 focus:outline-blue-800' id="category"

                        {...register('category', { required: true })}>
                        {categories.length > 0 && categories.map(category => (
                            <option key={category.id} value={category.name}
                            >{category.name}</option>
                        ))}
                    </select>
                </div>
                {/* field description */}
                <div className='w-full'>
                    <label className='block w-full my-2' htmlFor="description" >Description</label>
                    {errors.description?.type === 'maxLength' && <p className='text-red-500'>Characters must not be greater than 1000</p>}
                    {errors.description?.type === 'required' && <p className='text-red-500'>field required</p>}
                    <textarea id="description"
                        className='border border-slate-400 resize-none w-full h-[150px] focus:outline-blue-800'
                        {...register('description', { minLength: 2, maxLength: 1000, required: true })}></textarea>
                </div>
                {/* field discount */}
                <div className='w-full'>
                    <label className='block w-full my-2' htmlFor="discount" >Discount percent(%)</label>
                    {errors.discount?.type === 'min' && <p className='text-red-500'>Discount must not be less than 1</p>}
                    {errors.discount?.type === 'max' && <p className='text-red-500'>Discount must not be greater than 99</p>}
                    {errors.discount?.type === 'pattern' && <p className='text-red-500'>{errors.discount?.message}</p>}

                    <input id="discount"
                        className='border border-slate-400 rounded-sm w-full p-1 focus:outline-blue-800' type="text"
                        placeholder='10%'
                        defaultValue={0}
                        {...register('discount', {
                            min: 0, max: 99, pattern: {
                                value: /^[0-9]+$/,
                                message: 'Discount must be a number'
                            }
                        },)}></input>

                </div>
                {/* Field image */}
                <div className='w-full'>

                    <label className='block w-full my-2 ' htmlFor="image" >Select an image</label>
                    <input type="file" className='border border-slate-400  w-full' id='image'

                        onChange={uploadImage}
                    />

                </div>
                <button className='bg-blue-800 text-white p-2 block w-full mt-4 font-bold uppercase' type='submit'>{id ? 'update Product' : 'Next'}</button>
            </form>
        </main>
    )
}

export default FormProduct