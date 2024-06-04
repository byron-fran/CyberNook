"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("../controllers/payment.controller");
const verifyToken_1 = require("../jwt/verifyToken");
const router = (0, express_1.Router)();
router.get('/payment-checkout', verifyToken_1.verifyToken, payment_controller_1.createSession);
router.post('/payment-sheet', payment_controller_1.paymentSheet);
exports.default = router;
