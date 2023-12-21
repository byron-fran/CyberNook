import React from 'react'
import CheckAnimation from '../../libs/CheckAnimation.json';
import SuccessAnimation from '../../libs/SuccessAnimation.json'
import Lottie from 'lottie-react';
import { useAppSelector } from '../../redux/hooks/hooks';
import { NavLink } from 'react-router-dom';


const SuccessPayment = () => {
  const {user} = useAppSelector(state => state.auth)
  return (
    <div className='w-full relative flex flex-col  justify-center'>
      <div className=' md:w-[400px] mx-auto absolute left-0 right-0 top-0'>
         <Lottie animationData={SuccessAnimation}/>
      </div>
      <div className=' md:w-[400px] mx-auto h-[300px] '>
       
        <Lottie animationData={CheckAnimation}/>
      </div>
      <h2 className='text-center text-blue-800 md:text-2xl uppercase'>Thanks for your purchase, {user?.name}</h2>
      <NavLink className='text-center bg-blue-800 text-white md:w-[20%] mx-auto uppercase mt-20 p-2' to='/'>
      Go back to the store
      </NavLink>
    </div>
  )
}

export default SuccessPayment