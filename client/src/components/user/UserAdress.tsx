import { useAppSelector } from '../../redux/hooks/hooks'
import { useForm } from 'react-hook-form';
import { Address } from '../../interface/Address';
import SweetAlert from '../../libs/SweetAlert';
import useHandleAddress from '../../hooks/address/useHandleAddress';

const UserAddress = () => {

    const { handleSubmit, setValue, register, } = useForm<Address>();

    const {
        onSubmit,
        handleDeleteAddress,
        showAlert,
        disabledStreet,
        disableCodePostal,
        disableCountry,
        disabledCity,
        disableInteriorNumber,
        setDisableStreet,
        setDisableCodePostal,
        setDisableCountry,
        setDisableCity,
        setDisableInteriorNumber,
        existAddress } = useHandleAddress(setValue, handleSubmit);

    const { address } = useAppSelector(state => state.address);


    return (
        <div className='border border-slate-300 w-full mb-10'>
            {showAlert && <SweetAlert
                title='Updated Address successfully'
                type='success'
                bgColor='#fff'
                colorText='#1e40af'
            />}
            <h2 className='bg-blue-800 text-white p-2 font-bold'>Your Address</h2>
            <form action="" className='mt-4 w-full'
                onSubmit={onSubmit}>
                {/* Field name */}
                <div className='flex justify-between'>
                    <div className='w-[90%] mx-auto grid grid-cols-4 '>
                        <label htmlFor="" className='col-span-1'>Street</label>
                        <input type="text"
                            className={` p-1 col-span-3 w-full mt-2
                    ${disabledStreet ? 'border border-slate-200' : 'border-2 border-blue-800'}`}
                            {...register('street')}
                            disabled={disabledStreet}
                        />
                    </div>
                    <div className=' p-1  cursor-pointer'>
                        <img className='w-[20px] mx-auto mt-4 '
                            src="/images/pencil.svg" alt="icon-edit"
                            onClick={() => setDisableStreet(!disabledStreet)} />
                    </div>


                </div>
                {/* Field email */}
                <div className='flex justify-between'>
                    <div className='w-[90%] mx-auto grid grid-cols-4 '>
                        <label htmlFor="email" className='col-span-1'>Postal Code</label>
                        <input type="text"
                            id='email'
                            className={` p-1 col-span-3 w-full mt-4
                    ${disableCodePostal ? 'border border-slate-200' : 'border-2 border-blue-800'}`}
                            {...register('postalCode')}
                            disabled={disableCodePostal}
                        />
                    </div>
                    <div className=' p-1  cursor-pointer'>
                        <img className='w-[20px] mx-auto mt-4'
                            src="/images/pencil.svg" alt="icon-edit"
                            onClick={() => setDisableCodePostal(!disableCodePostal)} />
                    </div>

                </div>
                {/* Field City */}
                <div className='flex justify-between'>
                    <div className='w-[90%] mx-auto grid grid-cols-4 '>
                        <label htmlFor="" className='col-span-1'>City</label>
                        <input type="text"
                            className={` p-1 col-span-3 w-full mt-4
                    ${disabledCity ? 'border border-slate-200' : 'border-2 border-blue-800'}`}
                            {...register('city')}
                            disabled={disabledCity}
                        />
                    </div>
                    <div className=' p-1  cursor-pointer'>
                        <img className='w-[20px] mx-auto mt-4'
                            src="/images/pencil.svg" alt="icon-edit"
                            onClick={() => setDisableCity(!disabledCity)} />
                    </div>
                </div>
                {/* Field Interior Number */}
                <div className='flex justify-between'>
                    <div className='w-[90%] mx-auto grid grid-cols-4 '>
                        <label htmlFor="" className='col-span-1'>Exterior Number</label>
                        <input type="text"
                            className={` p-1 col-span-3 w-full mt-4
                    ${disableInteriorNumber ? 'border border-slate-200' : 'border-2 border-blue-800'}`}
                            {...register('exteriorNumber')}
                            disabled={disableInteriorNumber}
                        />
                    </div>
                    <div className=' p-1  cursor-pointer'>
                        <img className='w-[20px] mx-auto mt-4'
                            src="/images/pencil.svg" alt="icon-edit"
                            onClick={() => setDisableInteriorNumber(!disableInteriorNumber)} />
                    </div>
                </div>
                {/* Field Country */}
                <div className='flex justify-between'>
                    <div className='w-[90%] mx-auto grid grid-cols-4 '>
                        <label htmlFor="" className='col-span-1'>Country</label>
                        <input type="text"
                            className={` p-1 col-span-3 w-full mt-4
                    ${disableCountry ? 'border border-slate-200' : 'border-2 border-blue-800'}`}
                            {...register('country')}
                            disabled={disableCountry}
                        />
                    </div>
                    <div className=' p-1  cursor-pointer'>
                        <img className='w-[20px] mx-auto mt-4'
                            src="/images/pencil.svg" alt="icon-edit"
                            onClick={() => setDisableCountry(!disableCountry)} />
                    </div>
                </div>
                <div className='flex justify-between mt-10'>
                    <button className='bg-red-500 text-white p-2 uppercase font-bold' type='button'
                        onClick={() => handleDeleteAddress(address?.id)}>Delete Address</button>
                    <button className='bg-blue-800 text-white p-2 uppercase font-bold' type='submit'>{existAddress ? 'Update Address' : 'Add Address'}</button>
                </div>

            </form>
        </div>
    )
}

export default UserAddress