import { useEffect } from 'react';
import { formaterDinero } from '../../helpers';
import { useAppSelector } from '../../redux/hooks/hooks'
import Spinner from '../../spinner/Spinner';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { getAllOrdersThunk } from '../../redux/thunks/CartThunks';

const Orders = () => {
  const { user, isLoading } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const filterOrderPayed = user.Orders?.filter(order => order.paid === true);
  useEffect(() => {
    dispatch(getAllOrdersThunk())
  }, [])

  return (
    <>

      {isLoading ? <Spinner /> : (
        <div className='flex flex-col h-full md:h-[43rem] md:overflow-y-scroll justify-start w-full'>
          {filterOrderPayed?.length === 0 ? (<p className='text-center font-bold'>You still have no orders</p>)
            : <p className='text-center font-bold'>Orders history</p>}
          {filterOrderPayed?.map(order => {
            const fecha = new Date(order.updatedAt!);
            //const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
            const fechaFormateada = fecha.toLocaleDateString('es-ES');

            return (
              <div key={order.id} className='flex items-center gap-4 border border-slate-300 mt-4 p-2'>
                <img className='w-[100px] h-[100px] object-contain' src={order.image} alt="img-order" />
                <div className="flex flex-col items-start">
                  <p className="font-bold text-[0.8rem]">Product: <span className="text-blue-800">{order.name}</span></p>
                  <p className="font-bold text-[0.8rem]">Quantity:<span className="text-blue-800"> {order.quantity}</span></p>
                  <p className="font-bold text-[0.8rem]">Price: <span className="text-blue-800"> {formaterDinero(order.price)}</span></p>
                  <p className="font-bold text-[0.8rem]">Date of purchase: <span className="text-blue-800">{fechaFormateada}</span></p>
                </div>
              </div>
            )
          })}
        </div>
      )}

    </>

  )
}

export default Orders