import { useAppSelector } from '../../redux/hooks/hooks'
import UsePagination from '../../hooks/UsePagination';

const OrdersPage = () => {

    const { orders } = useAppSelector(state => state.orders);
    const { productsPerPage : ordersPerPage, pageButtons, totalPages, currentPage, setCurrentPage } = UsePagination(orders, 10)

    return (
        <>
            <main className=' col-span-3 w-[95%] md:w-[90%] mx-auto mt-10'>
                <div className='h-[70vh] md:h-[83vh] w-full overflow-y-scroll no-scrollbar'>
                    {ordersPerPage.length > 0 ? ordersPerPage?.map((order ) => {

                        
                        return (
                            <div key={order.id} className='grid grid-cols-4 border border-slate-300 mt-4 p-2 rounded-sm'>
                                <div className='flex items-center  col-span-3'>
                                    <img className='w-[90px] h-[90px] object-contain' src={order.image} alt="img-order" />
                                    <div className='ml-2'>
                                        <p className='font-thin text-[13px] uppercase'>{order.quantity}</p>
                                        <p className='font-thin text-[13px] uppercase'>{order.name}</p>
                                        <p className='font-thin text-[13px] uppercase'>{order.unitPrice}</p>
                                        
                                    </div>
                                </div>
                                <div className='flex flex-col col-span-1'>
                                    <p className='font-thin text-[13px] uppercase'>user: <span>{order?.User?.name}</span></p>
                                    <p className='font-thin text-[13px] uppercase'>Price Total: <span>{order.price}</span></p>
                                    <p className={`font-thin  text-[13px] uppercase`}>Paid: <span className={`${order.paid ? 'text-lime-500' : 'text-red-500'}`}>{order.paid ? 'success': 'pending' }</span></p>
                                </div>
                            </div>
                        )
                    }) : (<p className='text-center uppercase font-bold text-2xl col-span-2'>There are no orders yet</p>)}
                </div>
                <div className='mt-4 flex justify-center items-center gap-4 mb-4'>
                    {currentPage !== 1 && (
                        <button
                            className='border border-slate-300 p-2 rounded-md'
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(1)}
                        >Back</button>
                    )}

                    {pageButtons()?.map((button, index) => {
                        return (
                            <div key={index}>
                                <button
                                    className={`${currentPage !== button ? 'border border-slate-300 p-2 rounded-md' : 'bg-blue-800 text-white p-2 rounded-md'}`}
                                    disabled={button === currentPage}
                                    onClick={() => setCurrentPage(button)}>{button}</button>
                            </div>
                        )
                    })}

                    {currentPage !== totalPages && (
                        <button
                            className='border border-slate-300 p-2 rounded-md'
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >Next</button>
                    )}
                    {totalPages !== 1 && (
                        <button
                            className='border border-slate-300 p-2 rounded-md'
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

export default OrdersPage