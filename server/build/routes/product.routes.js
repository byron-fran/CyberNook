"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const UploadImage_1 = __importDefault(require("../middlewares/UploadImage"));
const verifyToken_1 = require("../jwt/verifyToken");
const router = (0, express_1.Router)();
router.post('/product', UploadImage_1.default.single('image'), products_controller_1.createProduct);
router.get('/product/:id', products_controller_1.getProductById);
router.delete('/product/:id', verifyToken_1.verifyToken, products_controller_1.deleteProductById);
router.put('/product/:id', products_controller_1.updateProductById),
    router.get('/all_products', products_controller_1.getAllProducts),
    router.get('/products', products_controller_1.getProducts);
exports.default = router;
