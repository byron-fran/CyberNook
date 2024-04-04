import { useForm } from 'react-hook-form'
import { UserType } from '../../types/auth/User';
import 'react-phone-input-2/lib/style.css';
import { NavLink, useNavigate, } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { loginUserThunk } from '../../redux/thunks/AuthThunk';
import { useEffect, useState } from 'react';
import Spinner from '../../spinner/Spinner';

const Login = () => {

    const { register, formState: { errors }, handleSubmit, reset } = useForm<UserType>();
    const { isAuthenticated, isLoading } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();
    const Navigate = useNavigate();
    const [errorLogin, seErrorLogin] = useState('')

    useEffect(() => {
        if (isAuthenticated) {
            Navigate('/')
            return
        }
    }, [])

    const onSubmit = handleSubmit((data) => {
        dispatch(loginUserThunk(data))
            .then((data) => {

                if (data?.type === 'auth/login/rejected') {
                    seErrorLogin(data.payload as string)
                    return
                }
                seErrorLogin('')
                Navigate('/')
            })
            .catch(error => {
                return error
            })
        //reset
        reset()
    })

    return (
        <>
            {isLoading ?
                <div className="bg-white h-[60vh] w-full flex items-center justify-center">
                    <Spinner />
                </div> : (
                    <div className='flex h-screen justify-center items-center w-[95%] md:w-[60%] lg:w-[40%] mx-auto'>

                        <form action="" method='post' className='w-full border rounded-md  border-slate-300 p-4'
                            onSubmit={onSubmit}>

                            {errorLogin.length > 0 && <p className='text-center text-red-500'>{errorLogin}</p>}
                            <div className='w-full'>
                                <label htmlFor="email" className='block p-2'>Email</label>
                                {errors.email?.type === 'required' && (<p className='text-red-500'>Email is required</p>)}
                                {errors.email?.type === 'pattern' && (<p className='text-red-500'>Must be a email valid </p>)}
                                <input type='text' placeholder='Example3@gmail.com' id='email'
                                    className='border border-slate-200 w-full p-2 rounded-md mb-2'
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
                                <input type='password' placeholder='Your password' id='password'
                                    className='border border-slate-200 w-full p-2 rounded-md mb-2'
                                    {...register('password', {
                                        required: true, minLength: 1, maxLength: 50, pattern: {
                                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                            message: 'Your password must have at least one number and one letter'
                                        }
                                    })} />
                            </div>

                            <button type='submit' className='text-white bg-blue-800 p-2 w-full rounded-md mt-4 '>Login</button>
                            <div className='flex gap-2'>
                                <p>Do you not have account?</p>
                                <NavLink to='/register' className='text-indigo-500'>Sign Up</NavLink>
                            </div>
                        </form>
                    </div>
                )}
        </>

    )
}

export default Login