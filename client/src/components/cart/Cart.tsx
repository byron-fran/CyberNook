import axios, { AxiosError } from "axios";
import React, { useEffect, } from "react";
import CardPurchase from "./CardPurchase";
import { Cart as CartInterface, } from "../../interface/Cart";

const Cart : React.FC<CartInterface> = ({cart , setCart}) => {

    useEffect(() => {
        const getCartPurchase = async () => {
            const url = `http://localhost:4000/store/list_cart`;
            try{
                const {data} = await axios(url);
                setCart(data)
                return data
            }
            catch(error : unknown){
                if(error instanceof AxiosError){
                    console.log(error.message)
                }
            }
        }
        getCartPurchase();
    },[setCart]);
    
    if(!cart || cart === undefined){return null}
  return (
    <div>
       {cart.map(purchase => (
        <CardPurchase key={purchase.id} purchase={purchase}/>
       ))}
    </div>
  )
}

export default Cart