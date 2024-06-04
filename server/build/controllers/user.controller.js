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
exports.verify = exports.deleteUserById = exports.getAllUsers = exports.updateProfile = exports.deleteProfile = exports.getProfile = exports.logout = exports.login = exports.register = void 0;
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const axios_1 = require("axios");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Order_1 = __importDefault(require("../models/Order"));
const Address_1 = __importDefault(require("../models/Address"));
const Reviews_1 = __importDefault(require("../models/Reviews"));
const Product_1 = __importDefault(require("../models/Product"));
dotenv_1.default.config();
const register = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password } = req.body;
    try {
        const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
        if (!isValidEmail) {
            return res.status(404).json({ message: 'It is not a valid email' });
        }
        const userFound = yield User_1.default.findOne({ where: { email } });
        if (userFound) {
            return res.status(404).json({ message: 'User already exits' });
        }
        ;
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        const user = yield User_1.default.create(Object.assign(Object.assign({}, req.body), { password: passwordHash }));
        if (!process.env.SECRET_KEY) {
            return res.status(500).json({ message: 'Error: SECRET_KEY not defined' });
        }
        if (!user) {
            return res.status(500).json({ message: 'Error could not create user' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET_KEY, {
            algorithm: 'HS256',
            expiresIn: '1d'
        });
        return res.status(200).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                isAdmin: user.isAdmin,
            }
        });
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            return res.status(404).json({ message: (_a = error.response) === null || _a === void 0 ? void 0 : _a.data });
        }
        return res.status(500).json({ error: error });
    }
});
exports.register = register;
const login = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { email, password } = req.body;
    try {
        const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
        if (!isValidEmail) {
            return res.status(404).json({ message: 'It is not a valid email' });
        }
        const userFound = yield User_1.default.findOne({
            where: { email },
        });
        console.log(userFound);
        if (!userFound) {
            return res.status(404).json({ message: 'Email not found' });
        }
        const passwordVerify = yield bcrypt_1.default.compare(password, userFound.password);
        if (!passwordVerify) {
            return res.status(404).json({ message: 'password incorrect' });
        }
        ;
        const token = jsonwebtoken_1.default.sign({ id: userFound.id }, process.env.SECRET_KEY, {
            expiresIn: '1d',
            algorithm: 'HS256'
        });
        const address = yield Address_1.default.findOne({ where: { UserId: userFound.id } });
        return res.status(200).json({
            token,
            user: {
                id: userFound.id,
                name: userFound.name,
                email: userFound.email,
                phone: userFound.phone,
                isAdmin: userFound.isAdmin,
                Address: address === null ? {
                    street: "",
                    country: "",
                    city: "",
                    postalCode: '',
                    exteriorNumber: ''
                } : address
            },
        });
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            return res.status(401).json({ message: (_b = error.response) === null || _b === void 0 ? void 0 : _b.data });
        }
        console.log(error);
        return res.status(500).json({ error: error });
    }
});
exports.login = login;
const logout = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        res.clearCookie('token');
        return res.status(200).json({ message: 'logout' });
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            return res.status(404).json({ message: (_c = error.response) === null || _c === void 0 ? void 0 : _c.data });
        }
        return res.status(500).json({ message: 'Error unknown' });
    }
});
exports.logout = logout;
const getProfile = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { UserId, token } = req.body;
    try {
        const user = yield User_1.default.findOne({
            where: { id: UserId },
            include: [Order_1.default, Product_1.default, {
                    model: Address_1.default,
                }],
            attributes: { exclude: ['password'] }
        });
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        ;
        return res.status(200).json({
            token,
            user
        });
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            return res.status(404).json({ message: (_d = error.response) === null || _d === void 0 ? void 0 : _d.data });
        }
        console.log(error);
        return res.status(500).json({ message: error });
    }
});
exports.getProfile = getProfile;
const deleteProfile = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const { UserId } = req.body;
    try {
        const userDelete = yield User_1.default.findByPk(UserId);
        userDelete === null || userDelete === void 0 ? void 0 : userDelete.destroy();
        res.clearCookie('token');
        return res.status(200).json({ message: "Delete success" });
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            return res.status(404).json({ message: (_e = error.response) === null || _e === void 0 ? void 0 : _e.data });
        }
        return res.status(500).json({ message: 'Error unknown' });
    }
});
exports.deleteProfile = deleteProfile;
const updateProfile = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const { UserId, name, email, phone } = req.body;
    try {
        const user = yield User_1.default.findOne({ where: { id: UserId } });
        if (user) {
            // Actualiza los valores del usuario
            user.email = email;
            user.name = name;
            user.phone = phone;
            // user.isAdmin = true
            // Guarda los cambios en la base de datos
            yield (user === null || user === void 0 ? void 0 : user.save());
            return res.status(200).json(user);
        }
        else {
            return res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            return res.status(404).json({ message: (_f = error.response) === null || _f === void 0 ? void 0 : _f.data });
        }
        return res.status(500).json({ message: error });
    }
});
exports.updateProfile = updateProfile;
const getAllUsers = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.findAll({
            include: [Order_1.default, Reviews_1.default],
        });
        if (!users) {
            return res.status(404).json({ message: "users not found" });
        }
        ;
        return res.status(200).json(users);
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
exports.getAllUsers = getAllUsers;
const deleteUserById = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const userFound = yield User_1.default.findByPk(id);
        if (!userFound) {
            return res.status(404).json({ message: "Not found" });
        }
        ;
        yield userFound.destroy();
        return res.status(204).json({ message: "Success delete" });
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
exports.deleteUserById = deleteUserById;
const verify = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const { authorization } = req.headers;
    let token = "";
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        token = authorization.substring(7);
    }
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        const userFound = yield User_1.default.findOne({ where: { id: user.id } });
        if (!userFound)
            return res.status(401).json({ message: 'Unauthorized' });
        return res.status(200).json(userFound);
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            return res.status(404).json({ message: (_g = error.response) === null || _g === void 0 ? void 0 : _g.data });
        }
        return res.status(500).json({ message: 'Error unknown' });
    }
});
exports.verify = verify;
