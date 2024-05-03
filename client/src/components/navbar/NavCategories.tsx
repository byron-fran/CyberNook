import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks/hooks';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { getProductsThunk } from '../../redux/thunks/ProductsThunk';

const NavCategories = () => {

    const [optionNav, setOptionNav] = useState<boolean>(false);
    const [optionMark, setOptionMark] = useState<boolean>(false)
    const { listCategory: categories } = useAppSelector(state => state.category);
    const { marks } = useAppSelector(state => state.marks);
    const { currentPage } = useAppSelector(state => state.products)
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [selecetedMark, setSelectedMark] = useState<string>('');
    const dispatch = useAppDispatch();

    return (
        <>
            <div className='w-full'>
                <nav className='bg-white p-2 border border-slate-300 flex justify-around relative ' >
                    <NavLink to='/store?page=1' onClick={() => dispatch(getProductsThunk({ offset: 1 }))}>
                        Storewide
                    </NavLink>
                    <div onMouseEnter={() => setOptionNav(true)}
                        onMouseLeave={() => setOptionNav(false)}
                        className="relative">
                        <p className="cursor-pointer"> Categories</p>
                        <div
                            className={`${optionNav ? 'opacity-100 visible' : 'opacity-0 invisible'
                                } transition-opacity duration-300 ease-in-out p-4 left-[-50px] md:w-[150px] absolute  flex flex-col bg-white  rounded-sm shadow-lg z-10 `}
                        >
                            {categories?.map(category => {

                                return (
                                    <NavLink
                                        className='hover:decoration-blue-950 '
                                        onClick={() => {
                                            setOptionNav(false)
                                            setSelectedCategory(category.name)
                                        }}

                                        to={`/store/?page=${currentPage ? currentPage : 1}&category=${category.name}&mark=${selecetedMark}`} key={category.id}>{category.name}</NavLink>
                                )
                            })}

                        </div>

                    </div>
                    <div
                        onMouseEnter={() => setOptionMark(true)}
                        onMouseLeave={() => setOptionMark(false)}
                        className='relative'>
                        <p className="cursor-pointer">Marks</p>
                        <div className={`${optionMark ? 'opacity-100 visible' : 'opacity-0 invisible'}
                            transition-opacity duration-300 ease-in-out p-4 left-[-60px] md:w-[150px] absolute  flex flex-col bg-white  rounded-sm shadow-lg z-10 `}>
                            {marks.map(mark => {

                                return (
                                    <NavLink key={mark.id}
                                        className='hover:decoration-blue-950'
                                        onClick={() => {
                                            setOptionMark(false)
                                            setSelectedMark(mark.name)
                                        }}
                                        to={`/store/?page=${currentPage ? currentPage : 1}&mark=${mark.name}&category=${selectedCategory}`}>{mark.name}</NavLink>
                                )
                            })}
                        </div>

                    </div>

                </nav>
            </div>
        </>
    )
}

export default NavCategories