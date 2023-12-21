import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks'
import { formaterDinero } from '../../helpers';
import UsePagination from '../../hooks/UsePagination';
import { deleteProductByIdThunk } from '../../redux/thunks/ProductsThunk';

const ProductsPage = (): JSX.Element => {
    const { products } = useAppSelector(state => state.products);
    const { productsPerPage, pageButtons, totalPages, currentPage, setCurrentPage } = UsePagination(products);
    const dispatch = useAppDispatch();
    const Navigate = useNavigate()

    const handleDeleteProduct = async (id : number | string) => {
       await  dispatch(deleteProductByIdThunk(Number(id)))    
    }

    const handleUpdateProduct = (id : number | string) => {
        Navigate(`/admin/update-product/${id}`)
    }
    return (
        <>
            <main className='w-[95%] md:w-[85%] mx-auto mt-10 col-span-3'>
                <div className='grid md:grid-cols-2 w-full gap-4'>
                    {productsPerPage && productsPerPage?.map(product => {
                        return (
                            <div key={product.id} className='flex w-full justify-between border border-slate-300 p-2'>
                                <div className='flex items-center'>
                                    <img className='w-[100px] mx-auto h-[100px] object-contain' src={product.image} alt="img-product" />
                                    <div className='flex flex-col ml-4'>
                                        <p className=' font-thin text-[13px]'>{product.name}</p>
                                        <p className=' font-thin text-[13px]'>{formaterDinero(product.price)}</p>
                                        <p className=' font-thin text-[13px]'>{product.stock}</p>
                                        <p className=' font-thin text-[13px]'>{product.category}</p>

                                    </div>
                                </div>
                                <div className='flex items-center flex-col justify-around'>
                                    <button
                                    onClick={() => handleDeleteProduct(product.id)}><img className='w-[20px]' src="/images/basura.png" alt="icon-trash" /></button>
                                    
                                    <button
                                    onClick={() => handleUpdateProduct(product.id)}
                                    >Edit</button>
                                </div>

                            </div>
                        )
                    })}
                </div>
                <div className='mt-6'>
                    {currentPage !== 1 && (
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(1)}
                        >Back</button>
                    )}

                    {pageButtons()?.map((button, index) => {
                        return (
                            <div key={index}>
                                <button
                                    className={`${currentPage !== button ? 'border border-blue-800 p-2' : 'bg-blue-800 text-white p-2'}`}
                                    disabled={button === currentPage}
                                    onClick={() => setCurrentPage(button)}>{button}</button>
                            </div>
                        )
                    })}

                    {currentPage !== totalPages && (
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >Next</button>
                    )}
                    {totalPages !== 1 && (
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => {
                                setCurrentPage(totalPages)
                            }}
                        >Last</button>
                    )}
                </div>

            </main>
        </>
    )
}

export default ProductsPage