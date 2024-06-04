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
exports.updateSpecs = exports.deleteSpecsById = exports.getSpecsByProduct = exports.createSpecs = void 0;
const Specs_1 = __importDefault(require("../models/Specs"));
const axios_1 = require("axios");
const createSpecs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ProductId, model, ram, memory, color, size, weight, mesasures } = req.body;
    try {
        const specs = yield Specs_1.default.create(req.body);
        if (!specs) {
            return res.status(404).json({ message: "cannot create specs" });
        }
        return res.status(200).json(specs);
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
exports.createSpecs = createSpecs;
const getSpecsByProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const specs = yield Specs_1.default.findOne({ where: { id: req.params.ProductId } });
        if (!specs) {
            return res.status(404).json({ message: "cannot get specs" });
        }
        return res.status(200).json(specs);
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
exports.getSpecsByProduct = getSpecsByProduct;
const deleteSpecsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const specs = yield Specs_1.default.destroy({ where: { id: req.params.id } });
        if (!specs) {
            return res.status(404).json({ message: "cannot delete specs" });
        }
        return res.status(200).json({ message: "deleted" });
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
exports.deleteSpecsById = deleteSpecsById;
const updateSpecs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const specs = yield Specs_1.default.update(req.body, { where: { id: req.params.id } });
        if (!specs) {
            return res.status(404).json({ message: "cannot update specs" });
        }
        return res.status(200).json({ message: "updated" });
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
exports.updateSpecs = updateSpecs;
