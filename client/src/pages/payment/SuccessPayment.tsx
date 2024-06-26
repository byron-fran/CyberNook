import { useEffect } from 'react'
import CheckAnimation from '../../libs/CheckAnimation.json';
import SuccessAnimation from '../../libs/SuccessAnimation.json'
import Lottie from 'lottie-react';
import { useAppSelector } from '../../redux/hooks/hooks';
import { NavLink, useSearchParams, useNavigate, Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { paymentConfirmThunk } from '../../redux/thunks/CartThunks';
import Spinner from '../../spinner/Spinner';
import { updatePaymentConfirmThunk } from '../../redux/thunks/CartThunks';

const SuccessPayment = () => {

  const { user } = useAppSelector(state => state.auth);
  const { payConfirm, cart, errorToken } = useAppSelector(state => state.cart);

  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const token = searchParams.get("payment_transaction");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getOrders = async () => {
      if (token) {
        await dispatch(paymentConfirmThunk())
        return
      }
      navigate('/')
    }
    getOrders()

  }, [token, dispatch]);


  useEffect(() => {
    const updateOrders = async () => {
      if (payConfirm) {
        dispatch(updatePaymentConfirmThunk(cart))
        return
      }
    }
    updateOrders()

  }, [cart, dispatch, payConfirm])

  if (errorToken) return <Navigate to='/cancel-payment' />;

  return (
    <>
      {!payConfirm ? (
        <div className='bg-white h-[60vh] w-full flex items-center justify-center'>
          <Spinner />
        </div>
      ) : (
        <div className='w-full relative flex flex-col  justify-center'>
          <div className=' md:w-[400px] mx-auto absolute left-0 right-0 top-0'>
            <Lottie animationData={SuccessAnimation} />
          </div>
          <div className=' md:w-[400px] mx-auto h-[300px] '>

            <Lottie animationData={CheckAnimation} />
          </div>
          <h2 className='text-center text-blue-800 md:text-2xl uppercase'>Thanks for your purchase, {user?.name}</h2>
          <NavLink className='text-center bg-blue-800 text-white md:w-[20%] mx-auto uppercase mt-20 p-2' to='/'>
            Go back to the store
          </NavLink>
        </div>
      )}

    </>

  )
}

export default SuccessPayment