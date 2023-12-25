import Stripe from "stripe";
import dotenv from 'dotenv';
import { request, response } from "express";
import { AxiosError } from "axios";
import Order from "../models/Order";
import jwt from 'jsonwebtoken'

dotenv.config();


const stripe = new Stripe(process.env.SECRET_PAYMENT!, {

})

const createSession = async (req =request, res = response) => {
    const {UserId} = req.body;
    
    try{
        const cart = await Order.findAll({where : {UserId}});

        const token = jwt.sign({id : UserId}, process.env.SECRET_KEY_ORDER!, {
            algorithm : 'HS256',
            expiresIn : '60s'
        })
        
        const cartFilterNoPaid = cart.filter(order => order.paid !== true)
        const session = await stripe.checkout.sessions.create({
            line_items: cartFilterNoPaid.map(order => ({
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
            success_url : `http://localhost:5173/success-payment/?token=${token}`,
            cancel_url : 'http://localhost:5173/cancel-payment',
        })

        return res.status(200).json(session)
        
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