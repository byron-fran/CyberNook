import {useEffect, useState}from 'react'
import { NavLink, } from 'react-router-dom'
import axios, { AxiosError } from 'axios';
const Categories = () => {
    interface Category {
        name : string,
        id: number,
        image : string
    }
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
           try{
            const {data} = await axios('http://localhost:4000/category');
            setCategories(data)
           }
           catch(error : unknown){
            if(error instanceof AxiosError){
                console.log(error.response?.data)
            }
           }
        };
        getCategories();
    }, [])
    return (
        <main className='w-full mt-10 mb-10'>
            <h2 className='text-center mb-4 font-bold text-2xl uppercase'>Categories</h2>
            <ul className='w-full border border-slate-300 rounded-md  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-1 md:gap-0 '>
                {categories && categories.map((category : Category) =>  (
                    <li className='mt-4 mb-4 hover:border p-2 hover:border-slate-400 ' key={category.id}>
                        <NavLink to='/store'>
                            <h2 className='text-center font-bold '>{category.name}</h2>
                            <img className='w-full md:w-[150px] mx-auto  h-[200px] object-contain' src={`${category.image}`} alt="img-category" />

                        </NavLink>
                    </li>
                ))}

            </ul>
        </main>
    )
}

export default Categories