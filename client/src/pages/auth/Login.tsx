import { useForm } from 'react-hook-form'
import { UserType } from '../../types/auth/User';
import 'react-phone-input-2/lib/style.css';
import { NavLink } from 'react-router-dom';

const Login = () => {
    const { register, formState: { errors }, handleSubmit, control } = useForm<UserType>();

    const onSubmit = handleSubmit((data) => {
        console.log(data)
    })
  return (
    <div className='flex h-screen justify-center items-center w-[95%] md:w-[60%] lg:w-[40%] mx-auto'>
    <form action="" method='post' className='w-full border rounded-md  border-gray-300 p-4 '
        onSubmit={onSubmit}>
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

        <button type='submit' className='text-white bg-black p-2 w-full rounded-md mt-4 '>Login</button>
        <div className='flex gap-2'>
            <p>Do you not have account?</p>
            <NavLink to='/register' className='text-indigo-500'>Sign Up</NavLink>
        </div>
    </form>
</div>
  )
}

export default Login