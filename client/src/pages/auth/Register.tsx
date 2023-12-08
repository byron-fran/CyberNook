import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form'
import { UserType } from '../../types/auth/User';
import PhoneInput from 'react-phone-input-2';
import es from 'react-phone-input-2/lang/es.json'
import 'react-phone-input-2/lib/style.css';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { useAppSelector } from '../../redux/hooks/hooks';
import { registerUserThunk } from '../../redux/thunks/AuthThunk';
import Cookies from 'js-cookie';
import axios from 'axios';
import { tokenVerify } from './api/auth';

import { useNavigate } from 'react-router-dom';
const Register = () => {

    const { register, formState: { errors }, handleSubmit, control, reset } = useForm<UserType>();
    const auth = useAppSelector((state) => state.auth);
    const Navigate = useNavigate()
    const dispatch = useAppDispatch()
    console.log(auth?.user)


    const onSubmit = handleSubmit((data) => {
        dispatch(registerUserThunk(data));
        // redirect
        Navigate('/')

        //clear field
        reset()
      

    })
    return (
        <div className='flex h-screen justify-center items-center w-[95%] md:w-[60%] lg:w-[40%] mx-auto'>
            <form action="" method='post' className='w-full border rounded-md  border-gray-300 p-4 '
                onSubmit={onSubmit}>
                {/* field name */}
                <div className='w-full'>
                    <label htmlFor="name" className='block p-2'>Name</label>
                    {errors.name?.type === 'required' && (<p className='text-red-500'>name is required</p>)}
                    <input type='text' placeholder='Juan pedro' id='name'
                        className='border border-gray-200 w-full p-2 rounded-md mb-2'
                        {...register('name', { required: true, minLength: 1, maxLength: 50 })} />
                </div>
                {/* field email */}
                <div className='w-full'>
                    <label htmlFor="email" className='block p-2'>Email</label>
                    {errors.email?.type === 'required' && (<p className='text-red-500'>Email is required</p>)}
                    {errors.email?.type === 'pattern' && (<p className='text-red-500'>Must be a email valid </p>)}
                    <input type='text' placeholder='pedro123@gmail.com' id='email'
                        className='border border-gray-200 w-full p-2 rounded-md mb-2'
                        {...register('email', {
                            required: true, minLength: 1, maxLength: 50, pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, // Expresión regular para validar el correo
                                message: "It must be a valid email"
                            }
                        })} />
                </div>
                {/* field password */}
                <div className='w-full'>
                    <label htmlFor="password" className='block p-2'>Password</label>
                    {errors.password?.type === 'required' && (<p className='text-red-500'>Password is required</p>)}
                    {errors.password?.type === 'pattern' && (<p className='text-red-500'>Password must be have a number and a letter </p>)}
                    <input type='text' placeholder='pedro123' id='password'
                        className='border border-gray-200 w-full p-2 rounded-md mb-2'
                        {...register('password', {
                            required: true, minLength: 1, maxLength: 50, pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                message: 'Your password must have at least one number and one letter'
                            }
                        })} />
                </div>
                {/* Field phone */}
                <div className='w-full'>
                    <label htmlFor="phone" className='block p-2'>Phone</label>
                    {errors.phone?.type === 'required' && (<p className='text-red-500'>Phone is required</p>)}
                    <Controller
                        name='phone'
                        control={control}
                        rules={{ required: true }}
                        render={({ field, fieldState: { error } }) => {
                            return (

                                <PhoneInput
                                    {...field}
                                    onChange={(value) => {
                                        field.onChange(value);
                                    }}
                                    value={field.value}
                                    countryCodeEditable={false}
                                    localization={es}
                                    inputStyle={{
                                        width: '100%',
                                        border: 'solid 1px rgb(229 231 235 / var(--tw-border-opacity))',
                                        borderRadius: '6px',
                                        marginBottom: '0.5rem'
                                    }}
                                    inputProps={{
                                        name: 'phone',
                                        required: true,
                                        autoFocus: true,
                                    }}
                                />
                            )
                        }}
                    />

                </div>
                <button type='submit' className='text-white bg-black p-2 w-full rounded-md mt-4 '>Create account</button>
                <div className='flex gap-2'>
                    <p>Do you have account?</p>
                    <NavLink to='/login' className='text-indigo-500'>Login</NavLink>
                </div>
            </form>
        </div>
    )
}

export default Register