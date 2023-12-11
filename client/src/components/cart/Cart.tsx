import axios, { AxiosError } from "axios";
import React, { useContext, useEffect, useState} from "react";
import CardPurchase from "./CardPurchase";
import { PurchaseType } from "../../interface/Purchase";
import { CartContext } from "../../context/CartContext";
// import { PurchaseType } from "../../interface/Purchase";
import { useAppSelector } from "../../redux/hooks/hooks";

import Payment from "./Payment";
const Cart : React.FC= () => {

    const {user} = useAppSelector(state => state.auth)
    console.log(user)

  return (
    <div className="w-full md:w-[90%] mx-auto flex flex-col md:flex-row  justify-center mt-20">
        <div className="md:w-[70%]">
             {user.orders && user.orders.map(purchase => (
             <CardPurchase key={purchase.id} purchase={purchase}/>
            ))}
        </div>
        <div className=" md:w-[30%] h-auto pt-10 mt-10 md:mt-0 md:pt-0 md:h-[90vh] p-8 border border-1 border-slate-300 shadow-md">
            <Payment/>
        </div>
    </div>
  )
}

export default Cart