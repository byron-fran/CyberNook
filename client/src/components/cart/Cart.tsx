
import React, { useEffect, useState } from "react";
import CardPurchase from "./CardPurchase";
import Spinner from "../../spinner/Spinner";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { deleteOrderByIdThunk } from "../../redux/thunks/CartThunks";
import { getAllOrdersThunk } from "../../redux/thunks/CartThunks";
import Lottie from "lottie-react";
import AnimationCart from '../../libs/CartAnimation.json'

import Payment from "./Payment";
import { NavLink } from "react-router-dom";
const Cart: React.FC = () => {

  const dispatch = useAppDispatch()
  const { cart, isLoading } = useAppSelector(state => state.cart);
  const [refreshData, setRefresData] = useState(false);


  useEffect(() => {
    const getOrders = async () => {
     await dispatch(getAllOrdersThunk())
    }
    getOrders()
  
  }, [refreshData, dispatch]);


  const filterOrdersByDelete = (id: number) => {
    
    setRefresData(true);

    dispatch(deleteOrderByIdThunk(id));
    setRefresData(false)

  };

  const cartFilterNoPayment = cart.filter(order => order.paid !== true)

  return (
    <>
    
      {isLoading ?
      <div className="bg-white h-[60vh] w-full flex items-center justify-center">
        <Spinner />
      </div> : (
        <>
          {cartFilterNoPayment?.length >= 1 ? (
            <div className="w-full md:w-[80%] mx-auto flex flex-col md:flex-row  justify-center my-20 gap-4 ">
              <div className="md:w-[70%] md:h-[88vh] overflow-y-scroll scrollbar-none no-scrollbar">
                {cartFilterNoPayment && cartFilterNoPayment.map(purchase => (
                  <CardPurchase
                    filterOrdersByDelete={filterOrdersByDelete}
                    key={purchase.id}
                    purchase={purchase} />
                ))}
              </div>
              <div className=" md:w-[30%] h-auto pt-10 mt-10 md:mt-0 md:pt-0  p-8 border border-1 border-slate-300 shadow-md">
                <Payment />
              </div>

            </div>
          ) : (
            <div className="w-full flex justify-center items-center mt-10">
              <div className=" md:w-[30%] mx-auto">
                <h1 className="text-[2rem] font-bold text-center uppercase">cart  empty</h1>
                <Lottie animationData={AnimationCart} />
                <NavLink className='text-center bg-blue-800 text-white w-full block p-2 uppercase' to='/'>Go to Store</NavLink>
              </div>

            </div>
          )}
        </>
      )}



    </>

  )
}

export default Cart