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
exports.deleteAddress = exports.getAddress = exports.updatAddress = exports.createAdress = void 0;
const axios_1 = require("axios");
const express_1 = require("express");
const Address_1 = __importDefault(require("../models/Address"));
const createAdress = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAdress = yield Address_1.default.create(req.body);
        if (!newAdress) {
            return res.status(404).json({ message: 'address not save' });
        }
        ;
        return res.status(200).json(newAdress);
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
exports.createAdress = createAdress;
const updatAddress = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { street, city, country, postalCode, exteriorNumber } = req.body;
    try {
        const addressFound = yield Address_1.default.findOne({ where: { id } });
        if (!addressFound) {
            return res.status(404).json({ message: 'Address not found' });
        }
        ;
        addressFound.street = street;
        addressFound.city = city;
        addressFound.country = country;
        addressFound.postalCode = postalCode;
        addressFound.exteriorNumber = exteriorNumber;
        addressFound.save();
        return res.status(200).json(addressFound);
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
exports.updatAddress = updatAddress;
const getAddress = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { UserId } = req.body;
    try {
        const address = yield Address_1.default.findOne({ where: { UserId } });
        if (!address) {
            return res.status(404).json({ message: 'address no found' });
        }
        return res.status(200).json(address);
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
exports.getAddress = getAddress;
const deleteAddress = (req = express_1.request, res = express_1.response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const addressId = yield Address_1.default.findOne({ where: { id } });
        if (!addressId) {
            return res.status(404).json({ message: 'address not found' });
        }
        ;
        addressId.destroy();
        return res.status(204);
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
exports.deleteAddress = deleteAddress;
