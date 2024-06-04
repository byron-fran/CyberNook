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
exports.createQuestion = void 0;
const Question_1 = __importDefault(require("../models/Question"));
const axios_1 = require("axios");
const createQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, description } = req.body;
    try {
        const question = yield Question_1.default.create(req.body);
        return res.status(200).json({ message: 'success', question });
    }
    catch (error) {
        if (error instanceof axios_1.AxiosError) {
            return res.status(404).json({ message: (_a = error.response) === null || _a === void 0 ? void 0 : _a.data });
        }
        return res.status(500).json({ message: 'Error unknown' });
    }
});
exports.createQuestion = createQuestion;
