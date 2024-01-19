import React from 'react'
import { useParams, } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { getProductsByCategoryThunk } from '../../redux/thunks/CategoryThunks'
import CardProduct from '../../components/products/CardProduct';
import UsePagination from '../../hooks/UsePagination'
import ListButtons from '../../components/buttons/ListButtons'
const CategoryPage = () => {
    const { category } = useParams();
    const { productByCategory } = useAppSelector(state => state.category);
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (category) {

            dispatch(getProductsByCategoryThunk(category))
            return
        }
    }, [category]);

    const {currentPage, pageButtons, totalPages, setCurrentPage, productsPerPage} = UsePagination(productByCategory, 10)

    return (
        <>
            {productsPerPage?.length > 0 ? (
            <main className="w-full md:w-3/4 mx-auto grid ">
                {productsPerPage?.map(product => (
                    <CardProduct key={product.id} product={product} />
                ))}
            </main>
            ) :
            <div className='h-[50vh] flex items-center justify-center w-full'>
                <h1 className='text-center font-extrabold uppercase text-2xl'>There is no product with this category</h1>
            </div>}
            <ListButtons
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                pageButtons={pageButtons}

            />
        </>

    )
}

export default CategoryPage