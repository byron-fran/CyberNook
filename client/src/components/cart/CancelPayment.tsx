import React from 'react'
import CancelAnimation from '../../libs/CancelAnimation.json'
import Lottie from 'lottie-react'
import { NavLink } from 'react-router-dom'

const CancelPayment = () => {
  return (
    <div className='mt-4 flex flex-col'>
      <div className='md:w-[250px] mx-auto'>
        <Lottie animationData={CancelAnimation}/>
      </div>
      <h2 className='text-center mt-4 text-red-500 uppercase md:text-2xl'>You canceled your purchase</h2>
      <NavLink className='text-center bg-blue-800 text-white md:w-[20%] mx-auto uppercase mt-20 p-2' to='/'>
      Go back to the store
      </NavLink>
    </div>
  )
}

export default CancelPayment