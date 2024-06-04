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
exports.checkFavorite = exports.getFavoritesByUser = exports.removeFromFavorite = exports.addNewFavorite = void 0;
const express_1 = require("express");
const axios_1 = require("axios");
const Product_1 = __importDefault(require("../models/Product"));
const User_1 = __importDefault(require("../models/User"));
const addNewFavorite = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { ProductId } = req.params;
    const { UserId } = req.body;
    try {
        const user = yield User_1.default.findByPk(UserId);
        const product = yield Product_1.default.findByPk(ProductId);
        const favs = yield (product === null || product === void 0 ? void 0 : product.$get('users'));
        if (!product || !user) {
            return res.status(404).json({ message: "Not found" });
        }
        ;
        const favoriteExist = favs === null || favs === void 0 ? void 0 : favs.find(user => user.id === UserId);
        if (favoriteExist) {
            yield product.$remove('User', favoriteExist);
            return res.status(200).json(false);
        }
        ;
        yield user.$add('Product', product);
        return res.status(200).json(true);
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
        else {
            console.log(error);
            return res.status(500).json({ message: error });
        }
    }
});
exports.addNewFavorite = addNewFavorite;
const getFavoritesByUser = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { UserId } = req.body;
    try {
        const user = yield User_1.default.findByPk(UserId);
        const favorites = yield (user === null || user === void 0 ? void 0 : user.$get('products'));
        if ((favorites === null || favorites === void 0 ? void 0 : favorites.length) === 0) {
            return res.status(202).json([]);
        }
        return res.status(200).json(favorites);
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
exports.getFavoritesByUser = getFavoritesByUser;
const removeFromFavorite = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { ProductId } = req.params;
    const { UserId } = req.body;
    try {
        const user = yield User_1.default.findByPk(UserId);
        const product = yield Product_1.default.findByPk(ProductId);
        if (!product || !user) {
            return res.status(404).json({ message: "Not found" });
        }
        yield user.$remove('Product', product);
        return res.status(200).json(false);
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
exports.removeFromFavorite = removeFromFavorite;
const checkFavorite = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { ProductId } = req.params;
    const { UserId } = req.body;
    try {
        const user = yield User_1.default.findByPk(UserId);
        const product = yield Product_1.default.findByPk(ProductId);
        const favs = yield (product === null || product === void 0 ? void 0 : product.$get('users'));
        if (!product || !user) {
            return res.status(404).json({ message: "Not found" });
        }
        const favoriteExist = favs === null || favs === void 0 ? void 0 : favs.find(user => user.id === UserId);
        if (favoriteExist) {
            return res.status(200).json(true);
        }
        return res.status(200).json(false);
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
        else {
            console.log(error);
            return res.status(500).json({ message: error });
        }
    }
});
exports.checkFavorite = checkFavorite;
