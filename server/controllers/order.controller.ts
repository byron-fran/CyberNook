import { request, response } from 'express'
import Order from '../models/Order'
import { Order as OrderInterface } from '../interfaces/Order';
import { AxiosError } from 'axios';
import { log } from 'console';

//userId

const createOrder = async (req = request, res = response) => {
    const { name, quantity, paid, price, image, UserId}: OrderInterface = req.body;
    console.log(req.body)
    try {
        
        const newOrder = await Order.create(req.body);

        if (!newOrder) { return res.status(404).json({ message: "cannot add to order" }) };
        return res.status(200).json(newOrder)


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
const getAllOrders = async (req = request, res = response) => {
    const { UserId }: OrderInterface = req.body;


    try {

        const listOrders = await Order.findAll({ where: { UserId } });
        if (!listOrders) { return res.status(404).json({ message: 'Cart yet is Empty' }) };

        return res.status(200).json(listOrders)
    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            return res.status(500).json({ message: error.message })
        }
        else {
            return res.status(500).json({ message: 'Error unknown' })
        }
    }
}
const updateOrder = async (req = request, res = response) => {
    const { id } = req.params;
    const { price, quantity }: OrderInterface = req.body;

    try {
        const orderFound = await Order.findByPk<Order>(id);
   

        if (!orderFound) { return res.status(404).json({ message: 'Error purchase does not exist' }) };
        orderFound.price = price;
        orderFound.quantity = quantity
        orderFound.save();
        return res.status(200).json({
            success: 'purchase update',
            orderFound
        })
    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            return res.status(500).json({ message: error.message })
        }
        else {
            return res.status(500).json({ message: 'Error unknown' })
        }
    }
}
const deleteOrderById = async (req = request, res = response) => {
    const { id } = req.params
    try {
        const success = await Order.destroy({ where: { id } });
        if (!success) { return res.status(404).json({ message: 'Cannot delete purchase' }) };

        return res.status(200).json({ message: `Your purchase ${id} has been deleted` })

    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            return res.status(500).json({ message: error.message })
        }
        else {
            return res.status(500).json({ message: 'Error unknown' })
        }
    }
}
export {
    createOrder,
    getAllOrders,
    updateOrder,
    deleteOrderById
}