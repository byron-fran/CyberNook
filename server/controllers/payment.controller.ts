import Stripe from "stripe";
import dotenv from 'dotenv';
import { request, response } from "express";
import { AxiosError } from "axios";
import Order from "../models/Order";
import jwt from 'jsonwebtoken'

dotenv.config();


const stripe = new Stripe(process.env.SECRET_PAYMENT!, {
    typescript : true,
     
})

const createSession = async (req = request, res = response) => {
    const { UserId } = req.body;

    try {
        const cart = await Order.findAll({ where: { UserId } });

        //create token
        let token = jwt.sign({ id: UserId }, process.env.SECRET_KEY_ORDER!, {
            algorithm: 'HS256', //algoritmo
            expiresIn: '1m',
        })

        //filter cart without paid
        const cartFilterNoPaid = cart.filter(order => order.paid !== true)

        //create session stripe
        const session = await stripe.checkout.sessions.create({
            line_items: cartFilterNoPaid.map(order => {

                return ({

                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: order.name,
                            description: order.name,
                        },
                        //order.discount > 0 ? (order.unitPrice - (order.unitPrice * (order.discount / 100))) * order.quantity  :  order.unitPrice * order.quantity 
                        unit_amount: order.discount > 0 ? (order.unitPrice - (order.unitPrice * (order.discount / 100))) * 100 : order.unitPrice * 100,
                    },
                    quantity: order.quantity,
                })
            }),
            mode: 'payment',

            //redirect url success and cancel
            success_url: `https://cyber-nook-8wwr.vercel.app/success-payment/?payment_transaction=${token}`,
            cancel_url: 'https://cyber-nook-8wwr.vercel.app/cancel-payment',
        })

        return res.status(200).json(session)

    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            return res.status(500).json({ message: error.message })
        }
        else {
            return res.status(500).json({ message: error })
        }
    }
};

const paymentSheet = async (req = request, res = response) => {
    const { UserId } = req.body
    try {

        const customer = await stripe.customers.create()
        const ephemeralKey = await stripe.ephemeralKeys.create(

            { customer: UserId },
            { apiVersion: '2023-10-16' }
        );
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1099,
            currency: 'eur',
            customer: UserId,
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter
            // is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
        });
        return res.status(200).json({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: UserId,
            publishableKey: process.env.SECRET_PAYMENT!
        })
    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.log(error.message)
            return res.status(500).json({ message: error.message })
        }
        else {
            console.log(error)
            return res.status(500).json({ message: 'Error unknown' })
        }
    }
}

export {
    createSession,
    paymentSheet
}