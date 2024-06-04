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
exports.getAllProducts = exports.updateProductById = exports.getProductByMark = exports.deleteProductById = exports.getProducts = exports.getProductById = exports.createProduct = void 0;
const express_1 = require("express");
const Product_1 = __importDefault(require("../models/Product"));
const axios_1 = require("axios");
const sequelize_1 = require("sequelize");
const Reviews_1 = __importDefault(require("../models/Reviews"));
const Specs_1 = __importDefault(require("../models/Specs"));
const createProduct = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = yield Product_1.default.create(req.body);
        if (!newProduct) {
            return res.status(404).json({ error: 'No saved product' });
        }
        ;
        return res.status(200).json(newProduct);
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            return res.status(500).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: error });
        }
    }
});
exports.createProduct = createProduct;
const getProductById = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const productFind = yield Product_1.default.findByPk(id, {
            include: [Reviews_1.default, Specs_1.default]
        });
        if (!productFind) {
            return res.status(404).json({ error: `Product ${id} does not exist` });
        }
        ;
        return res.status(200).json(productFind);
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            return res.status(500).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: error });
        }
    }
});
exports.getProductById = getProductById;
const getProductsBySearch = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, name, filter, page } = req.query;
    try {
        const offset = (Number(page) - 1) * 2 || 0;
        const totalItems = yield Product_1.default.count();
        if (category === 'category') {
            const cleanedName = name === null || name === void 0 ? void 0 : name.toString().replace(/\+/g, '');
            const productFilterByName = yield Product_1.default.findOne({
                where: {
                    name: {
                        [sequelize_1.Op.like]: `%${cleanedName}%`
                    }
                }
            });
            const productFilters = yield Product_1.default.findAll({
                limit: 10,
                offset: offset,
                where: {
                    category: {
                        [sequelize_1.Op.iLike]: `%${filter}%`
                    }
                }
            });
            if (!productFilters) {
                return res.status(404).json({ message: 'not found' });
            }
            ;
            return res.status(200).json({
                product: productFilterByName,
                products: productFilters,
                totalItems,
                currentPage: page ? Number(page) : 1
            });
        }
        else if (category === 'name') {
            const cleanedName = name === null || name === void 0 ? void 0 : name.toString().replace(/\+/g, '');
            const productFilterByName = yield Product_1.default.findOne({
                where: {
                    name: {
                        [sequelize_1.Op.like]: `%${cleanedName}%`
                    }
                }
            });
            const productFilters = yield Product_1.default.findAll({
                limit: 10,
                offset: offset,
                where: {
                    name: {
                        [sequelize_1.Op.iLike]: `%${filter}%`
                    }
                }
            });
            if (!productFilters) {
                return res.status(404).json({ message: 'not found' });
            }
            ;
            return res.status(200).json({
                product: productFilterByName,
                products: productFilters,
                totalItems,
                currentPage: page ? Number(page) : 1
            });
        }
        else if (category === 'mark') {
            const cleanedName = name === null || name === void 0 ? void 0 : name.toString().replace(/\+/g, '');
            const productFilterByName = yield Product_1.default.findOne({
                where: {
                    name: {
                        [sequelize_1.Op.like]: `%${cleanedName}%`
                    }
                }
            });
            const productFilters = yield Product_1.default.findAll({
                limit: 10,
                offset: offset,
                where: {
                    mark: {
                        [sequelize_1.Op.iLike]: `%${filter}%`
                    }
                }
            });
            if (!productFilters) {
                return res.status(404).json({ message: 'not found' });
            }
            ;
            return res.status(200).json({
                product: productFilterByName,
                products: productFilters,
                totalItems,
                currentPage: page ? Number(page) : 1
            });
        }
        // Consultar productos con limit y offset adecuados
        const products = yield Product_1.default.findAll({
            limit: 2,
            offset: offset,
        });
        // Verificar si no hay productos
        if (products.length === 0) {
            return res.status(404).json([]);
        }
        return res.status(200).json({
            products,
            totalItems,
            currentPage: page ? Number(page) : 1 // Si no se proporciona una página, establecerla en 1 por defecto
        });
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            return res.status(500).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: error });
        }
    }
});
const getAllProducts = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield Product_1.default.findAll();
        if (allProducts.length) {
            return res.status(200).json({ allProducts, });
        }
        ;
        return res.status(404).json('no products');
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
exports.getAllProducts = getAllProducts;
const getProducts = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, mark, page } = req.query;
    const cleanedMark = mark === null || mark === void 0 ? void 0 : mark.toString().replace(/\+/g, '');
    const cleanedCategory = category === null || category === void 0 ? void 0 : category.toString().replace(/\+/g, '');
    try {
        const offset = (Number(page) - 1) * 2 || 0;
        const totalItems = yield Product_1.default.count();
        let whereClause = {}; // Define el tipo de whereClause como WhereClause
        // Verifica si se proporcionó la categoría en el query
        if (cleanedCategory) {
            whereClause.category = {
                [sequelize_1.Op.like]: `%${cleanedCategory}%`
            };
        }
        // Verifica si se proporcionó la marca en el query
        if (cleanedMark) {
            whereClause.mark = {
                [sequelize_1.Op.like]: `%${cleanedMark}%`
            };
        }
        // Realiza la consulta con las cláusulas WHERE dinámicas
        const products = yield Product_1.default.findAll({
            limit: 10,
            where: whereClause,
            order: [['discount', 'DESC']] // Aplica las cláusulas WHERE construidas dinámicamente
        });
        // Retorna una lista vacía si no se encontraron productos
        if (!products || products.length === 0) {
            return res.status(200).json({
                products: []
            });
        }
        // Retorna los productos encontrados
        return res.status(200).json({
            products
        });
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
exports.getProducts = getProducts;
const deleteProductById = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield Product_1.default.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }
        yield product.destroy();
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
exports.deleteProductById = deleteProductById;
const updateProductById = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, stock, category, image, discount } = req.body;
    const { id } = req.params;
    try {
        const productFound = yield Product_1.default.findByPk(id);
        if (!productFound) {
            return res.status(404).json({ message: "Product not found" });
        }
        ;
        productFound.name = name;
        productFound.price = price;
        productFound.stock = stock;
        productFound.category = category;
        productFound.image = image;
        productFound.discount = discount;
        yield productFound.save();
        return res.status(200).json(productFound);
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
exports.updateProductById = updateProductById;
const getProductByMark = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { mark } = req.params;
    try {
        const productMark = yield Product_1.default.findAll({ where: { mark } });
        if (!productMark) {
            return res.status(200).json({ message: "not found" });
        }
        ;
        return res.status(200).json(productMark);
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
exports.getProductByMark = getProductByMark;
