import { NavLink } from 'react-router-dom'


const FormPage = () => {

    return (
        <div className='w-full h-full md:h-[40vh] overflow-y-scroll col-span-3 relative flex items-center justify-center mt-5 '>
            <nav className=' w-[95%]  mx-auto flex flex-col  md:flex-row  h-full justify-center items-start mt-10 gap-4 relative'>
                <NavLink to='/admin/create-product'
                    className='border border-slate-400 w-[90%] mx-auto h-[200px] flex justify-center flex-col items-center rounded-md mt-8  hover:-translate-y-1 ease-out transition-all'>
                    <h2 className='text-blue-800 font-bold uppercase'> Create Product</h2>

                    <p className='text-blue-500 text-left ml-4'>
                        A product must have a name, stock, price, brand, category, image, discount, a description and some specifications.
                    </p>
                </NavLink>
                <NavLink to='/admin/create-category'
                    className='border border-slate-400   w-[90%] mx-auto h-[200px] flex justify-center items-center flex-col rounded-md mt-8  hover:-translate-y-1 ease-out transition-all'>
                    <h2 className='text-blue-800 font-bold uppercase'> Create A Category</h2>

                    <p className='text-blue-500 '>
                        A product has a name,  and image
                    </p>
                </NavLink>
            </nav>

        </div>
    )
}

export default FormPage