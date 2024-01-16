import { request, response } from 'express'
import OrdersCart from '../models/Order'
import { Order as OrderInterface } from '../interfaces/Order';
import axios, { AxiosError } from 'axios';
import User from '../models/User';
import Product from '../models/Product';

//userId

const createOrder = async (req = request, res = response) => {
    const { quantity, ProductId }: OrderInterface = req.body;

    try {
        const newOrder = await OrdersCart.create(req.body);
        const product = await Product.findOne({ where: { id: ProductId } });
        if (!product) { return res.status(404).json({ message: 'product Not found' }) };
        if (!newOrder) { return res.status(404).json({ message: "cannot add to order" }) };

        product.stock = product.stock - quantity;
        await product.save()
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

        const listOrders = await OrdersCart.findAll({ where: { UserId } });
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
    const { price, quantity, paid, ProductId }: OrderInterface = req.body;

    try {

        const orderFound = await OrdersCart.findByPk<OrdersCart>(id);
        const product = await Product.findOne({ where: { id: ProductId } })
        if (!product) { return res.status(404).json({ message: 'product not found' }) }
        if (!orderFound) { return res.status(404).json({ message: 'Error purchase does not exist' }) };

        let quantityRest = 0
        //update product stock quantity
        if (quantity > orderFound.quantity) {
            quantityRest = quantity - orderFound.quantity
            product.stock = product.stock - quantityRest
            // //save product
            await product.save();
            //update order

        }
        else if (orderFound.quantity > quantity) {
            quantityRest = orderFound.quantity - quantity;
            product.stock = product.stock + quantityRest
            await product.save()
        }
        orderFound.price = price;
        orderFound.quantity = quantity;
        orderFound.paid = paid;

        if(orderFound.discount > 0){
            console.log('el descuento es mayor a 0');
            orderFound.price = orderFound.price - (orderFound.price * orderFound.discount) / 100;
            await orderFound.save();
        }
        else{
            await orderFound.save();
        }

        console.log(orderFound);
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

    const { id } = req.params;

    try {
        const orderFound = await OrdersCart.findOne({ where: { id } })

        const product = await Product.findOne({ where: { id: orderFound?.ProductId } });
        if (!orderFound) { return res.status(404).json({ message: 'Cannot delete purchase' }) };
        if (!product) { return res.status(404).json({ message: "not found" }) };

        const { quantity } = orderFound;

        if (orderFound.paid === true) {
            product.stock = product.stock - quantity;
            await product.save();
            await orderFound.destroy();
            return res.status(200).json({ message: `Your purchase ${id} has been deleted` })

        }
        else {
            product.stock = product.stock + quantity;
            await product.save();
            await orderFound.destroy();
            return res.status(200).json({ message: `Your purchase ${id} has been deleted` })
        }


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

const getAllOrdersByAdmin = async (req = request, res = response) => {
    try {

        const orders = await OrdersCart.findAll({
            include: User,

        });
        if (!orders) { return res.status(404).json({ message: 'not found orders' }) };
        return res.status(200).json(orders)
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

const paymentConfirm = async (req = request, res = response) => {
    const { UserId } = req.body
    try {
        const orders = await OrdersCart.findAll({ where: { UserId } });
        if (!orders) { return res.status(404).json({ message: 'error' }) };


        return res.status(200).json(orders)

    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            return res.status(500).json({ message: error.message })
        }
        else {
            return res.status(500).json({ message: error })
        }
    }
}
export {
    createOrder,
    getAllOrdersByUser,
    updateOrder,
    deleteOrderById,
    getAllOrdersByAdmin,
    paymentConfirm
}