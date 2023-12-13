import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../redux/hooks/hooks'
import { useForm } from 'react-hook-form';

const UserData = () => {
    const { user } = useAppSelector(state => state.auth);
    const { handleSubmit, setValue, register, } = useForm();
    const [disableName, setDisableName] = useState<boolean>(true);
    const [disabledPhone, setDisablePhone] = useState<boolean>(true);
    const [disableEmail, setDisableEmail] = useState<boolean>(true)

    useEffect(() => {

        if (user) {
            setValue('name', user.name);
            setValue('email', user.email)
            setValue('phone', user.phone);
            return
        }
    }, [user]);


    if (!user) { return null }
    const onSubmit = handleSubmit(data => {
        console.log(data)
    })

    return (
        <div className='border border-slate-300 w-full '>
            <h2 className='bg-blue-800 text-white p-2 font-bold'>Your personal information</h2>
            <form action="" className='mt-4 w-full'
                onSubmit={onSubmit}>
                {/* Field name */}
                <div className='flex justify-between'>
                    <div className='w-[90%] mx-auto grid grid-cols-4 '>
                        <label htmlFor="" className='col-span-1'>Name</label>
                        <input type="text"
                            className={` p-1 col-span-3 w-full mt-2
                            ${disableName ? 'border border-slate-200' : 'border-2 border-blue-800'}`}
                            {...register('name')}
                            disabled={disableName}
                        />
                    </div>
                    <div className=' p-1  cursor-pointer'>
                        <img className='w-[20px] mx-auto mt-4 '
                            src="/images/pencil.svg" alt="icon-edit"
                            onClick={() => setDisableName(!disableName)} />
                    </div>


                </div>
                {/* Field email */}
                <div className='flex justify-between'>
                    <div className='w-[90%] mx-auto grid grid-cols-4 '>
                        <label htmlFor="email" className='col-span-1'>Email</label>
                        <input type="text"
                            id='email'
                            className={` p-1 col-span-3 w-full mt-4
                            ${disableEmail ? 'border border-slate-200' : 'border-2 border-blue-800'}`}
                            {...register('email')}
                            disabled={disableEmail}
                        />
                    </div>
                    <div className=' p-1  cursor-pointer'>
                        <img className='w-[20px] mx-auto mt-4'
                            src="/images/pencil.svg" alt="icon-edit"
                            onClick={() => setDisableEmail(!disableEmail)} />
                    </div>

                </div>
                {/* Field Phone */}
                <div className='flex justify-between'>
                    <div className='w-[90%] mx-auto grid grid-cols-4 '>
                        <label htmlFor="" className='col-span-1'>Phone</label>
                        <input type="text"
                            className={` p-1 col-span-3 w-full mt-4
                            ${disabledPhone ? 'border border-slate-200' : 'border-2 border-blue-800'}`}
                            {...register('phone')}
                            disabled={disabledPhone}
                        />
                    </div>
                    <div className=' p-1  cursor-pointer'>
                        <img className='w-[20px] mx-auto mt-4' 
                            src="/images/pencil.svg" alt="icon-edit"
                            onClick={() => setDisablePhone(!disabledPhone)} />
                    </div>
                </div>
                <div className='flex justify-between mt-10'>
                    <button className='bg-red-500 text-white p-2 uppercase font-bold' type='button'>Delete Account</button>
                    <button className='bg-blue-800 text-white p-2 uppercase font-bold' type='submit'>Update </button>
                </div>

            </form>
        </div>
    )
}

export default UserData