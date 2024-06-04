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
exports.deleteReviewById = exports.getAllReviews = exports.getReviewsByProduct = exports.createReview = void 0;
const axios_1 = require("axios");
const express_1 = require("express");
const Reviews_1 = __importDefault(require("../models/Reviews"));
const User_1 = __importDefault(require("../models/User"));
const Product_1 = __importDefault(require("../models/Product"));
const createReview = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newReview = yield Reviews_1.default.create(Object.assign({}, req.body));
        if (!newReview) {
            return res.status(404).json({ message: 'Noy saved' });
        }
        ;
        return res.status(200).json(newReview);
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            console.log({ message: error.message });
            return res.status(500).json({ message: error.message });
        }
        else {
            console.log(error);
            return res.status(500).json({ message: 'Error unknown' });
        }
    }
});
exports.createReview = createReview;
const getReviewsByProduct = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { ProductId } = req.params;
    try {
        const reviews = yield Reviews_1.default.findAll({ where: { ProductId, },
            include: [
                Product_1.default,
                {
                    model: User_1.default,
                    attributes: { exclude: ['password', 'phone', ' email', '   isAdmin : boolean'] }
                }
            ],
        });
        if (!reviews) {
            return res.status(404).json({ message: "not found" });
        }
        ;
        return res.status(200).json(reviews);
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
exports.getReviewsByProduct = getReviewsByProduct;
const getAllReviews = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield Reviews_1.default.findAll({
            include: [
                Product_1.default,
                { model: User_1.default,
                    attributes: { include: ['name', 'id'] } }
            ],
        });
        if (!reviews) {
            return res.status(404).json({ message: 'not found reviews' });
        }
        ;
        return res.status(200).json(reviews);
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
exports.getAllReviews = getAllReviews;
const deleteReviewById = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const reviewFound = yield Reviews_1.default.findByPk(id);
        if (!reviewFound) {
            return res.status(404).json({ message: "Not found" });
        }
        ;
        yield reviewFound.destroy();
        return res.status(204).json({ message: "delete Success" });
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
exports.deleteReviewById = deleteReviewById;
