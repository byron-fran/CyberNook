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
exports.verifyToken = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = require("axios");
dotenv_1.default.config();
const verifyToken = (req = express_1.request, res = express_1.response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    let token = "";
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        token = authorization.substring(7);
    }
    try {
        if (!token) {
            return res.status(404).json({ message: 'Token no provided' });
        }
        //verify token
        const user = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.body.UserId = user.id;
        req.body.token = token;
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            return res.status(500).json({ message: error.message });
        }
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(504).json({ error });
    }
    next();
});
exports.verifyToken = verifyToken;
