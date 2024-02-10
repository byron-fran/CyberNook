import { useParams, } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { cleanCategoryList, getProductsByCategoryThunk } from '../../redux/thunks/CategoryThunks'
import CardProduct from '../../components/products/CardProduct';
import UsePagination from '../../hooks/UsePagination'
import ListButtons from '../../components/buttons/ListButtons'
import Spinner from '../../spinner/Spinner';
const CategoryPage = () => {
    const { category } = useParams();
    const { productByCategory, isLoading } = useAppSelector(state => state.category);
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (category) {

            dispatch(getProductsByCategoryThunk(category))
            return
        }
        return () => {
            dispatch(cleanCategoryList())
        }
    }, [category]);

    const { currentPage, pageButtons, totalPages, setCurrentPage, productsPerPage } = UsePagination(productByCategory, 10)

    return (
        <>
            {isLoading ? (
                <div className="bg-white h-[60vh] w-full flex items-center justify-center">
                    <Spinner />
                </div>
            ) : <>
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

            </>}

        </>

    )
}

export default CategoryPage