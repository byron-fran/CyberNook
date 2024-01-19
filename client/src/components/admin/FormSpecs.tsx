import { useEffect, useState } from 'react'
import { useForm, } from 'react-hook-form';
import { Specs } from '../../interface/Specs';
import SweetAlert from '../../libs/SweetAlert';
import { useParams, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import Spinner from '../../spinner/Spinner';

const FormSpecs = () => {
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { handleSubmit, register, formState: { errors }, setValue } = useForm<Specs>();

    const Navigate = useNavigate()
    const { ProductId, id } = useParams();

    useEffect(() => {
        if (!ProductId) {
            Navigate('/admin/create-product')
            return
        }
    }, [Navigate, ProductId]);

    useEffect(() => {
        const getSpecById = async () => {
            if (id) {
                try {

                    setIsLoading(true)
                    const { data } = await axios.get<Specs>(`${import.meta.env.VITE_BACKEND_URL}/specs/${id}`, {
                        withCredentials: true
                    });
                    setIsLoading(false)
                    setValue('color', data?.color);
                    setValue('memory', data?.memory);
                    setValue('model', data?.model);
                    setValue('ram', data?.ram);
                    setValue('memory', data?.memory);
                    setValue('screen', data?.screen);
                    setValue('weight', data?.weight);
                    setValue('mesasures', data?.mesasures);
                } catch (error: unknown) {
                    setIsLoading(false)
                    if (error instanceof AxiosError) {
                        console.log(error.response?.data)
                    }
                }
            }
        }
        getSpecById()
    }, [id]);

    const onSubmit = handleSubmit(async specs => {
        specs.ProductId = ProductId;

        if (id) {
            try {
                setIsLoading(true)
                await axios.put(`${import.meta.env.VITE_BACKEND_URL}/specs/${id}`, { ...specs, ProductId: Number(ProductId) }, { withCredentials: true });
                setShowAlert(true)
                setIsLoading(false)
                setTimeout(() => {
                    setShowAlert(false)
                    Navigate('/admin/products')
                }, 3000);
            } catch (error: unknown) {
                if (error instanceof AxiosError) {
                    console.log(error.response?.data)
                }
            }
            return
        }
        try {
            setIsLoading(true)
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/specs`, { ...specs, ProductId: Number(ProductId) }, { withCredentials: true });
            setShowAlert(true)
            setIsLoading(false)
            setTimeout(() => {
                setShowAlert(false)
                Navigate('/admin/products')
            }, 3000);
        } catch (error: unknown) {
            setIsLoading(false)
            if (error instanceof AxiosError) {
                console.log(error.response?.data)
            }
        }
    })
    return (
        <main className='w-full col-span-3 relative flex items-start justify-center mt-4 md:h-[85vh] overflow-y-scroll no-scrollbar'>
            {isLoading && <Spinner />}
            {showAlert && (
                <SweetAlert
                    type='success'
                    title={`${id ? 'Updated Successfully' : 'Created Successfully'}`}
                    bgColor='white'
                    colorText='#1e40af' />
            )}

            <form action="" className='w-[95%] mx-auto md:w-[70%] lg:w-[50%] mt-4 border border-slate-400 p-4 rounded-sm'
                onSubmit={onSubmit} >
                {/* field name */}
                <div className='w-full'>
                    <label className='block w-full my-2' htmlFor="color" >Color</label>
                    <select className='border border-slate-400 rounded-sm w-full p-1 focus:outline-blue-800' id='color'
                        placeholder='color product'
                        {...register('color', { required: true })}
                    >
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        <option value="black">Black</option>
                        <option value="white">White</option>
                        <option value="gray">Gray</option>
                        <option value="purple">Purple</option>
                        <option value="orange">Orange</option>
                        <option value="yellow">Yellow</option>
                        <option value="brown">Brown</option>
                        <option value="pink">Pink</option>
                        <option value="violet">Violet</option>
                        <option value="indigo">Indigo</option>
                        <option value="lime">Lime</option>
                        <option value="slate">Slate</option>

                    </select>
                </div>
                {/* field RAM */}
                <div className='w-full'>
                    <label className='block w-full my-2' htmlFor="ram" >Ram (optional)</label>
                    <input className='border border-slate-400 rounded-sm w-full p-1 focus:outline-blue-800' type="text" id='ram'
                        placeholder='16GB'
                        {...register('ram', { required: false })}
                    />
                </div>
                {/* Memory */}
                <div className='w-full'>
                    <label className='block w-full my-2' htmlFor="memory" >Memory (optional)</label>
                    {errors.memory?.type === 'maxLength' && <p className='text-red-500'>Max length 50</p>}
                    <input className='border border-slate-400 rounded-sm w-full p-1 focus:outline-blue-800' type="text" id='memory'
                        placeholder='128GB'
                        {...register('memory', {
                            required: false, minLength: 0, maxLength: 50
                        })}
                    />
                </div>
                {/* field mesasures */}
                <div className='w-full'>
                    <label className='block w-full my-2' htmlFor="mesasures" >Mesasures of product</label>
                    <input className='border border-slate-400 rounded-sm w-full p-1 focus:outline-blue-800' type="text" id='mesasures'
                        placeholder='35.6cm x 23.6cm x 1.8cm'
                        {...register('mesasures', { required: true })}
                    />
                </div>
                {/* field Model */}
                <div className='w-full'>
                    <label className='block w-full my-2' htmlFor="model" >Model</label>
                    {errors.model?.type === 'required' && <p className='text-red-500'>field required</p>}
                    <input className='border border-slate-400 rounded-sm w-full p-1 focus:outline-blue-800' type="text" id='model'
                        placeholder='CB4000'
                        {...register('model', { required: true })}
                    />
                </div>
                {/* field Size */}
                <div className='w-full'>
                    <label className='block w-full my-2' htmlFor="screen" >Screen (optional)</label>
                    {errors.screen?.type === 'min' && <p className='text-red-500'>Size must not be less than 0</p>}
                    <input className='border border-slate-400 rounded-sm w-full p-1 focus:outline-blue-800' type="text" id='screen'
                        placeholder='23 inches'
                        {...register('screen', {
                            required: false, pattern: {
                                value: /^[0-9]+$/,
                                message: 'Size must be a number'
                            }
                        })}
                    />
                </div>
                {/* field Weight */}
                <div className='w-full'>
                    <label className='block w-full my-2' htmlFor="weight" >Wheight  (number)</label>
                    {errors.weight?.type === 'min' && <p className='text-red-500'>Wheight must not be less than 0</p>}
                    <input className='border border-slate-400 rounded-sm w-full p-1 focus:outline-blue-800' type="text" id='weight'
                        placeholder=' 0.5 kg'
                        {...register('weight', {
                            required: false, min: 0, pattern: {
                                value: /^[0-9]+$/,
                                message: 'Wheight must be a number'
                            }
                        })}
                    />
                </div>
                <button className='bg-blue-800 text-white p-2 block w-full mt-4 font-bold uppercase' type='submit'>{id ? 'update Specs' : 'Add Specs'}</button>
            </form>
        </main>
    )
}

export default FormSpecs