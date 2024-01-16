import  { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks/hooks';

const NavCategories = () => {
    const [optionNav, setOptionNav] = useState<boolean>(false);
    const [optionMark, setOptionMark] = useState<boolean>(false)
    const { listCategory: categories } = useAppSelector(state => state.category);
    const { marks } = useAppSelector(state => state.marks);
    

    return (
        <>
            <div className='w-full'>
                <nav className='bg-white p-2 border border-slate-300 flex justify-around relative ' >
                    <NavLink to='/store'>
                        Storewide
                    </NavLink>
                    <div onMouseEnter={() => setOptionNav(true)}
                        onMouseLeave={() => setOptionNav(false)}
                        className="relative">
                        <p className="cursor-pointer"> Categories</p>
                        <div
                            className={`${optionNav ? 'opacity-100 visible' : 'opacity-0 invisible'
                                } transition-opacity duration-300 ease-in-out w-[100px] md:w-[200px] absolute  flex flex-col bg-white p-4 rounded-sm shadow-lg z-10 mr-2`}
                        >
                            {categories?.map(category => (
                                <NavLink
                                    className='hover:decoration-blue-950 '
                                    onClick={() => setOptionNav(false)}
                                    to={`category/${category.name}`} key={category.id}>{category.name}</NavLink>
                            ))}

                        </div>

                    </div>
                    <div 
                        onMouseEnter={() => setOptionMark(true)}
                        onMouseLeave={() => setOptionMark(false)}
                        className='relative'>
                        <p className="cursor-pointer">Marks</p>
                        <div className={`${optionMark ? 'opacity-100 visible' : 'opacity-0 invisible'}
                            transition-opacity duration-300 ease-in-out w-[100px] md:w-[200px] absolute  flex flex-col bg-white p-4 rounded-sm shadow-lg z-10 mr-2 `}>
                            {marks.map( mark => (
                                <NavLink key={mark.id}
                                className='hover:decoration-blue-950'
                                onClick={() => setOptionMark(false)}
                                to={`/mark/${mark.name}`}>{mark.name}</NavLink>
                            ))}
                        </div>

                    </div>

                </nav>
            </div>
        </>
    )
}

export default NavCategories