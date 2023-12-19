import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks/hooks';
import { logOutUserThunk } from '../../redux/thunks/AuthThunk';

type NamePanel  = {
    namePanel : string
}
const NavProfile : FC<NamePanel> = ({namePanel}) => {

  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logOutUserThunk())
  }

  return (
    <div className='w-full border border-b-slate-400 flex p-2 '>
        <nav className='flex justify-around w-full'>
            <NavLink className='text-white  bg-blue-800 p-2 uppercase text-[0.7rem] md:text-2xl font-bold rounded-md' to='/'>CyberNook</NavLink>
            <h1 className='text-blue-800 uppercase font-bold text-[1rem] md:text-2xl'>{namePanel}</h1>
            <NavLink to='/login' onClick={handleLogout} className='border border-red-500 uppercase text-red-500 text-[0.7rem] md:text-[1rem] p-2 font-bold rounded-md'>Logout</NavLink>
        </nav>
       
    </div>
  )
}

export default NavProfile