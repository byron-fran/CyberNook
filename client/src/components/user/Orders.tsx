
import { useAppSelector } from '../../redux/hooks/hooks'

const Orders = () => {
    const { user } = useAppSelector(state => state.auth);
   
  return (
    <div>
        {!user.Orders && (<p className='text-center font-bold'>You still have no orders</p>)}
        {user.Orders?.map(order => {
            return (
                <div key={order.id}>

                </div>
            )
        })}
    </div>
  )
}

export default Orders