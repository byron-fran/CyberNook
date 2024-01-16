import { NavLink, } from 'react-router-dom'
import { useAppSelector ,} from '../../redux/hooks/hooks';


const Categories = () => {
    const {listCategory :categories } = useAppSelector(state => state.category);


    return (
        <main className='w-[95%] md:w-[80%] mx-auto mt-10 mb-10'>
            <h2 className='text-center mb-4 font-bold text-2xl uppercase'>Categories</h2>
            <ul className='w-full border border-slate-300 rounded-md  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-1 md:gap-0 '>
                {categories && categories.map((category ) =>  (
                    <li className='mt-4 mb-4 hover:border p-2 hover:border-slate-400 ' key={category.id}>
                        <NavLink to={`category/${category.name}`}>
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