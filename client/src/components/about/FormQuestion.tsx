import React from 'react'
import {useForm} from 'react-hook-form'

interface Question {
    email : string
    description : string
}
const FormQuestion = () => {
    const {handleSubmit, register, formState : {errors}} = useForm<Question>();

    const onSubmit = handleSubmit(data => {
        
        console.log(data)
    })
  return (
    <div className='p-4  flex flex-col'>
         <h2 className='text-3xl font-bold text-white text-center'>Do you have any question ?</h2>
        <form onSubmit={onSubmit}>
            <div className=''>
                <label className='text-white '  htmlFor="email">Email</label>
                {errors.email && <p className='text-red-500'>Email is required</p>}
                <input className='w-full border border-slate-300 p-2 rounded-sm focus:outline-none' 
                    type="email" id="email" placeholder='Email'
                    {...register('email', {required : true})}/>
            </div>
            <div className='my-2'>
                <label className='text-white ' htmlFor="description">Description</label>
                {errors.description && <p className='text-red-500'>Description is required</p>}
                <textarea className='w-full border border-slate-300 p-2 rounded-sm focus:outline-none resize-none h-[200px]'
                    id="description" placeholder='Describe your question'
                    {...register('description', {required : true})}/>
            </div>
            <button className='bg-blue-800 hover:bg-blue-900 text-white p-2 rounded-md mt-4 w-full'>Submit</button>
        </form>
    </div>
  )
}

export default FormQuestion