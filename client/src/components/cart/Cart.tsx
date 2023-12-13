
import React, { useEffect, useState } from "react";
import CardPurchase from "./CardPurchase";
// import { PurchaseType } from "../../interface/Purchase";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { deleteOrderByIdThunk } from "../../redux/thunks/CartThunks";
import { getAllOrdersThunk } from "../../redux/thunks/CartThunks";

import Payment from "./Payment";
const Cart: React.FC = () => {

  const dispatch = useAppDispatch()
  const { cart } = useAppSelector(state => state.cart);
  const [refreshData, setRefresData] = useState(false);

  useEffect(() => {
      dispatch(getAllOrdersThunk())
  }, [refreshData, dispatch]);


  const filterOrdersByDelete = (id: number) => {
    setRefresData(true);
    
    dispatch(deleteOrderByIdThunk(id));
    setRefresData(false)
    
  };




  return (
    <div className="w-full md:w-[80%] mx-auto flex flex-col md:flex-row  justify-center my-20 gap-4 ">
      <div className="md:w-[70%] md:h-[88vh] overflow-y-scroll scrollbar-none no-scrollbar">
        {cart && cart.map(purchase => (
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
  )
}

export default Cart