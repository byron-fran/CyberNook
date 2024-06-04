"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentSheet = exports.createSession = void 0;
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = require("express");
const axios_1 = require("axios");
const Order_1 = __importDefault(require("../models/Order"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.SECRET_PAYMENT, {
    typescript: true,
});
const createSession = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { UserId } = req.body;
    try {
        const cart = yield Order_1.default.findAll({ where: { UserId } });
        //create token
        let token = jsonwebtoken_1.default.sign({ id: UserId }, process.env.SECRET_KEY_ORDER, {
            algorithm: 'HS256',
            expiresIn: '1m',
        });
        //filter cart without paid
        const cartFilterNoPaid = cart.filter(order => order.paid !== true);
        //create session stripe
        const session = yield stripe.checkout.sessions.create({
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
                });
            }),
            mode: 'payment',
            //redirect url success and cancel
            success_url: `https://cyber-nook-8wwr.vercel.app/success-payment/?payment_transaction=${token}`,
            cancel_url: 'https://cyber-nook-8wwr.vercel.app/cancel-payment',
        });
        return res.status(200).json(session);
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            return res.status(500).json({ message: error.message });
        }
        else {
            return res.status(500).json({ message: error });
        }
    }
});
exports.createSession = createSession;
const paymentSheet = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { UserId } = req.body;
    try {
        const customer = yield stripe.customers.create();
        const ephemeralKey = yield stripe.ephemeralKeys.create({ customer: UserId }, { apiVersion: '2023-10-16' });
        const paymentIntent = yield stripe.paymentIntents.create({
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
            publishableKey: process.env.SECRET_PAYMENT
        });
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            console.log(error.message);
            return res.status(500).json({ message: error.message });
        }
        else {
            console.log(error);
            return res.status(500).json({ message: 'Error unknown' });
        }
    }
});
exports.paymentSheet = paymentSheet;
