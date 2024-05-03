import { useAppSelector } from '../../redux/hooks/hooks'

const OrdersPage = () => {

    const { orders } = useAppSelector(state => state.orders);

    return (
        <>
            <main className=' col-span-3 w-[95%] md:w-[90%] mx-auto mt-10'>
                <div className='h-[70vh] md:h-[83vh] w-full overflow-y-scroll no-scrollbar'>
                    {orders.length > 0 ? orders?.map((order) => {

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
                                    <p className={`font-thin  text-[13px] uppercase`}>Paid: <span className={`${order.paid ? 'text-lime-500' : 'text-red-500'}`}>{order.paid ? 'success' : 'pending'}</span></p>
                                </div>
                            </div>
                        )
                    }) : (<p className='text-center uppercase font-bold text-2xl col-span-2'>There are no orders yet</p>)}
                </div>
                <div className='mt-4 flex justify-center items-center gap-4 mb-4'>

                </div>
            </main>
        </>
    )
}

export default OrdersPage