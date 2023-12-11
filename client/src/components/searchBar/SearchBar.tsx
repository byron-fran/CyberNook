import React from 'react'

const SearchBar = () => {
  return (
    <div className='w-[95%] md:w-[70%] lg:w-[50%] mx-auto mt-4'>

        <input
            className='border border-slate-500 w-full rounded-md p-2' 
            type="text" 
            placeholder='buscar, producto, marca, etc.' />
    </div>
  )
}

export default SearchBar