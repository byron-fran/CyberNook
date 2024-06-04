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
exports.deletePurchaseById = exports.updatePurchase = exports.getAllPurchaseCart = exports.createPurchase = void 0;
const express_1 = require("express");
const Cart_1 = __importDefault(require("../models/Cart"));
const axios_1 = require("axios");
;
const createPurchase = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, image, quantityProduct, price, id_purchase } = req.body;
    try {
        const newPurchase = yield Cart_1.default.create({ name, image, quantityProduct, price, id_purchase });
        if (!newPurchase) {
            return res.status(402).json({ error: 'Purchase invalid' });
        }
        return res.status(200).json({
            success: 'thank you for purchase',
            newPurchase
        });
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            return res.status(500).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: 'Error Desconocido' });
        }
    }
});
exports.createPurchase = createPurchase;
const getAllPurchaseCart = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listCart = yield Cart_1.default.findAll();
        if (!listCart) {
            return res.status(404).json({ error: 'Cart yet is Empty' });
        }
        ;
        return res.status(200).json(listCart);
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            return res.status(500).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: 'error uncknow' });
        }
    }
});
exports.getAllPurchaseCart = getAllPurchaseCart;
const updatePurchase = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { price, quantityProduct } = req.body;
    try {
        const purchaseFound = yield Cart_1.default.findByPk(id);
        if (!purchaseFound) {
            return res.status(404).json({ error: 'Error purchase does not exist' });
        }
        ;
        purchaseFound.price = price;
        purchaseFound.quantityProduct = quantityProduct;
        purchaseFound.save();
        return res.status(200).json({
            success: 'purchase update',
            purchaseFound
        });
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            return res.status(500).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: 'error uncknow' });
        }
    }
});
exports.updatePurchase = updatePurchase;
const deletePurchaseById = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const success = yield Cart_1.default.destroy({ where: { id } });
        if (!success) {
            return res.status(404).json({ error: 'Cannot delete purchase' });
        }
        ;
        return res.status(200).json({ ok: `Your purchase ${id} has deleted` });
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            return res.status(500).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: 'error uncknow' });
        }
    }
});
exports.deletePurchaseById = deletePurchaseById;
