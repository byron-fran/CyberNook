"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        const originalname = file.originalname;
        const extension = path_1.default.extname(originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = crypto_1.default.createHash('sha256').update(originalname + uniqueSuffix).digest('hex') + extension;
        // Comprueba si el archivo ya existe en la carpeta de destino
        const filePath = path_1.default.join('./uploads/', filename);
        if (fs_1.default.existsSync(filePath)) {
            // Si existe, renombra el archivo agregando un número aleatorio único
            const newFilename = crypto_1.default.createHash('sha256').update(originalname + Date.now()).digest('hex') + extension;
            cb(null, newFilename);
        }
        else {
            cb(null, filename);
        }
    },
});
const uploads = (0, multer_1.default)({ storage });
exports.default = uploads;
