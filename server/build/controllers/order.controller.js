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
exports.updatePayment = exports.getAllOrdersByAdmin = exports.deleteOrderById = exports.updateOrder = exports.getAllOrdersByUser = exports.createOrder = void 0;
const express_1 = require("express");
const Order_1 = __importDefault(require("../models/Order"));
const axios_1 = require("axios");
const User_1 = __importDefault(require("../models/User"));
const Product_1 = __importDefault(require("../models/Product"));
const createOrder = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { quantity, ProductId } = req.body;
    try {
        const newOrder = yield Order_1.default.create(req.body);
        const product = yield Product_1.default.findOne({ where: { id: ProductId } });
        if (!product) {
            return res.status(404).json({ message: 'product Not found' });
        }
        ;
        if (!newOrder) {
            return res.status(404).json({ message: "cannot add to order" });
        }
        ;
        product.stock = product.stock - quantity;
        yield product.save();
        return res.status(200).json(newOrder);
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
exports.createOrder = createOrder;
const getAllOrdersByUser = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { UserId } = req.body;
    try {
        const listOrders = yield Order_1.default.findAll({ where: { UserId } });
        if (!listOrders) {
            return res.status(404).json({ message: 'Cart yet is Empty' });
        }
        ;
        return res.status(200).json(listOrders);
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            return res.status(500).json({ message: error.message });
        }
        else {
            return res.status(500).json({ message: 'Error unknown' });
        }
    }
});
exports.getAllOrdersByUser = getAllOrdersByUser;
const updateOrder = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { price, quantity, paid, ProductId, discount } = req.body;
    try {
        const orderFound = yield Order_1.default.findByPk(id);
        const product = yield Product_1.default.findOne({ where: { id: ProductId } });
        if (!product) {
            return res.status(404).json({ message: 'product not found' });
        }
        if (!orderFound) {
            return res.status(404).json({ message: 'Error purchase does not exist' });
        }
        ;
        let quantityRest = 0;
        //update product stock quantity
        if (quantity > orderFound.quantity) {
            quantityRest = quantity - orderFound.quantity;
            product.stock = product.stock - quantityRest;
            // //save product
            yield product.save();
            //update order
        }
        else if (orderFound.quantity > quantity) {
            quantityRest = orderFound.quantity - quantity;
            product.stock = product.stock + quantityRest;
            yield product.save();
        }
        orderFound.price = price;
        orderFound.quantity = quantity;
        orderFound.paid = paid;
        yield orderFound.save();
        return res.status(200).json(orderFound);
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            return res.status(500).json({ message: error.message });
        }
        else {
            return res.status(500).json({ message: 'Error unknown' });
        }
    }
});
exports.updateOrder = updateOrder;
const deleteOrderById = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const orderFound = yield Order_1.default.findOne({ where: { id } });
        const product = yield Product_1.default.findOne({ where: { id: orderFound === null || orderFound === void 0 ? void 0 : orderFound.ProductId } });
        if (!orderFound) {
            return res.status(404).json({ message: 'Cannot delete purchase' });
        }
        ;
        if (!product) {
            return res.status(404).json({ message: "not found" });
        }
        ;
        const { quantity } = orderFound;
        product.stock = product.stock + quantity;
        yield product.save();
        yield orderFound.destroy();
        return res.status(200).json({ message: `Your purchase ${id} has been deleted` });
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            return res.status(500).json({ message: error.message });
        }
        else {
            return res.status(500).json({ message: 'Error unknown' });
        }
    }
});
exports.deleteOrderById = deleteOrderById;
const getAllOrdersByAdmin = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.findAll({
            include: User_1.default,
        });
        if (!orders) {
            return res.status(404).json({ message: 'not found orders' });
        }
        ;
        return res.status(200).json(orders);
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            return res.status(500).json({ message: error.message });
        }
        else {
            return res.status(500).json({ message: 'Error unknown' });
        }
    }
});
exports.getAllOrdersByAdmin = getAllOrdersByAdmin;
const updatePayment = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { UserId } = req.body;
    try {
        const orders = yield Order_1.default.findAll({ where: { UserId } });
        if (!orders) {
            return res.status(404).json({ message: "not found" });
        }
        return res.status(200).json(orders);
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            return res.status(500).json({ message: error.message });
        }
        else {
            return res.status(500).json({ message: 'Error unknown' });
        }
    }
});
exports.updatePayment = updatePayment;
