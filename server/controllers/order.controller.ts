import { request, response } from 'express'
import Order from '../models/Order'
import { Order as OrderInterface } from '../interfaces/Order';
import { AxiosError } from 'axios';
import { log } from 'console';
import User from '../models/User';

//userId

const createOrder = async (req = request, res = response) => {
    try {
        console.log(req.body)
        
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
const getAllOrdersByUser = async (req = request, res = response) => {
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
    const { price, quantity, paid}: OrderInterface = req.body;

    try {
        const orderFound = await Order.findByPk<Order>(id);
   

        if (!orderFound) { return res.status(404).json({ message: 'Error purchase does not exist' }) };
        orderFound.price = price;
        orderFound.quantity = quantity;
        orderFound.paid = paid
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
};

const getAllOrdersByAdmin = async (req= request, res = response) => {
    try{
        
        const orders = await Order.findAll({
            include : User,
        
        });
        if(!orders){return res.status(404).json({message : 'not found orders'})};
        return res.status(200).json(orders)
    }
    catch(error : unknown){
        if(error instanceof AxiosError){
            return res.status(500).json({message : error.message})
        }
        else{
        return res.status(500).json({message : 'Error unknown'})
        }
    }
}
export {
    createOrder,
    getAllOrdersByUser,
    updateOrder,
    deleteOrderById,
    getAllOrdersByAdmin
}