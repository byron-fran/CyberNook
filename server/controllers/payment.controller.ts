import Stripe from "stripe";
import dotenv from 'dotenv';
import { request, response } from "express";
import { AxiosError } from "axios";
import Order from "../models/Order";

dotenv.config();


const stripe = new Stripe(process.env.SECRET_PAYMENT!, {

})

const createSession = async (req =request, res = response) => {
    const {UserId} = req.body;
    
    try{
        const cart = await Order.findAll({where : {UserId}});

    

        const session = await stripe.checkout.sessions.create({
            line_items: cart.map(order => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: order.name,
                        description: order.name,
                    },
                    unit_amount: order.unitPrice * 100,
                },
                quantity: order.quantity,
            })),
            mode : 'payment',
            success_url : 'http://localhost:4000/cart/payment-success',
            cancel_url : 'http://localhost:4000/cart/payment-cancel',
        })

        return res.status(200).json({
            session,
            cart
        })
        
    }
    catch(error : unknown){
        if(error instanceof AxiosError){
            return res.status(500).json({message : error.message})
        }
        else{
        return res.status(500).json({message : error})
        }
    }
};
export {
    createSession
}