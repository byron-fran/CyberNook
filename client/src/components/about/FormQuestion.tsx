import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Alert from '../Success/Alert'
import { AxiosError } from 'axios'
import { cybernookApi as axios } from '../../config/api/cybernookApi'

interface Question {
    email: string
    description: string
};

const FormQuestion = () => {

    const { handleSubmit, register, formState: { errors }, reset } = useForm<Question>();
    const [messageSucess, setMessageSuccess] = useState<boolean>(false);

    const onSubmit = handleSubmit(async question => {

        try {

            await axios.post(`/question`, question);
            setMessageSuccess(true)

            reset()
            setTimeout(() => {
                setMessageSuccess(false)
            }, 2000)
        } catch (error: unknown) {
            setMessageSuccess(false)
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data)
            }
        }
    });

    return (
        <div className='p-4  flex flex-col'>

            {messageSucess && (
                <Alert message='Your question has been sent' />)}
            <h2 className='md:text-3xl font-bold  text-white text-center'>Do you have any question ?</h2>
            <form onSubmit={onSubmit}>
                <div className=''>
                    <label className='text-white ' htmlFor="email">Email</label>
                    {errors.email && <p className='text-red-500'>Email is required</p>}
                    {errors.email?.type === 'pattern' && <p className='text-red-500'>Invalid email address</p>}
                    <input className='w-full border border-slate-300 p-2 rounded-sm focus:outline-none'
                        type="email" id="email" placeholder='Email'
                        {...register('email', {
                            required: true, pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address'
                            }
                        })} />
                </div>
                <div className='my-2'>
                    <label className='text-white ' htmlFor="description">Description</label>
                    {errors.description && <p className='text-red-500'>Description is required</p>}
                    {errors.description?.type === 'minLength' && <p className='text-red-500'>Description must be at least 2 characters</p>}
                    {errors.description?.type === 'maxLength' && <p className='text-red-500'>Description must be less than 500 characters</p>}
                    <textarea className='w-full border border-slate-300 p-2 rounded-sm focus:outline-none resize-none h-[200px]'
                        id="description" placeholder='Describe your question'
                        {...register('description', { required: true, minLength: 2, maxLength: 500 })} />
                </div>
                <button className='bg-blue-800 hover:bg-blue-900 text-white p-2 rounded-md mt-4 w-full'>Submit</button>
            </form>
        </div>
    )
}

export default FormQuestion