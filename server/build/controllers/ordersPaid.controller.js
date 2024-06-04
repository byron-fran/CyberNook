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
exports.getOrdersPaidByUser = exports.getOrdersPaidByAdmin = exports.createOrderPaid = void 0;
const axios_1 = require("axios");
const express_1 = require("express");
const OrdersPaid_1 = __importDefault(require("../models/OrdersPaid"));
const createOrderPaid = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = yield OrdersPaid_1.default.create(req.body);
        if (!newOrder) {
            return res.status(404).json({ message: "not found" });
        }
        ;
        return res.status(200).json(newOrder);
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
exports.createOrderPaid = createOrderPaid;
const getOrdersPaidByUser = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { UserId } = req.body;
    try {
        const orders = yield OrdersPaid_1.default.findAll({ where: { UserId } });
        if (!orders) {
            return res.status(404).json({ message: "not found" });
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
exports.getOrdersPaidByUser = getOrdersPaidByUser;
const getOrdersPaidByAdmin = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield OrdersPaid_1.default.findAll();
        if (!orders) {
            return res.status(404).json({ message: "not found" });
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
exports.getOrdersPaidByAdmin = getOrdersPaidByAdmin;
