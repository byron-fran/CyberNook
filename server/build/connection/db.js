"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const Product_1 = __importDefault(require("../models/Product"));
const User_1 = __importDefault(require("../models/User"));
const Order_1 = __importDefault(require("../models/Order"));
const Specs_1 = __importDefault(require("../models/Specs"));
const Categories_1 = __importDefault(require("../models/Categories"));
const Address_1 = __importDefault(require("../models/Address"));
const Mark_1 = __importDefault(require("../models/Mark"));
const Reviews_1 = __importDefault(require("../models/Reviews"));
const Question_1 = __importDefault(require("../models/Question"));
const UserProducts_1 = __importDefault(require("../models/UserProducts"));
dotenv_1.default.config();
if (!process.env.POSTGRES_URL) {
    throw new Error('error db');
}
//`${process.env.POSTGRES_URL
// Configuración de la base de datos
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'postgres',
    // only in production
    // dialectOptions: { 
    //  ssl: {
    //    require: true,
    //   },
    // },
    //only in dev
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    models: [
        Product_1.default,
        User_1.default,
        Address_1.default,
        Order_1.default,
        Specs_1.default,
        Categories_1.default,
        Mark_1.default,
        Reviews_1.default,
        Question_1.default,
        UserProducts_1.default
    ],
});
//Order / User
User_1.default.hasMany(Order_1.default, {
    onDelete: 'CASCADE'
});
Order_1.default.belongsTo(User_1.default, {
    foreignKey: 'UserId',
});
//Relations address /user
User_1.default.hasOne(Address_1.default, {
    onDelete: 'CASCADE'
});
Address_1.default.belongsTo(User_1.default, {
    foreignKey: 'UserId'
});
//Relations marks /product
Mark_1.default.hasMany(Product_1.default, {
    onDelete: "CASCADE"
});
Product_1.default.belongsTo(Mark_1.default, {
    foreignKey: 'MarkId'
});
//Ralations Products / Order
Product_1.default.hasMany(Order_1.default, {
    onDelete: 'CASCADE'
});
Order_1.default.belongsTo(Product_1.default, {
    foreignKey: 'ProductId'
});
//Relations Reviews / Product
Product_1.default.hasMany(Reviews_1.default, {
    onDelete: 'CASCADE'
});
Reviews_1.default.belongsTo(Product_1.default, {
    foreignKey: 'ProductId'
});
//Relations Reviews / user
User_1.default.hasMany(Reviews_1.default, {
    onDelete: 'CASCADE'
});
Reviews_1.default.belongsTo(User_1.default, {
    foreignKey: 'UserId'
});
//Relations Category / Product
Categories_1.default.hasMany(Product_1.default, {
    onDelete: 'CASCADE'
});
Product_1.default.hasOne(Categories_1.default, {
    foreignKey: 'CategoryId'
});
//Relations specs / product
Product_1.default.hasOne(Specs_1.default, {
    onDelete: 'CASCADE',
});
Specs_1.default.belongsTo(Product_1.default, {
    foreignKey: 'ProductId'
});
//Relations Question / User
User_1.default.hasMany(Question_1.default, {
    onDelete: 'CASCADE'
});
Question_1.default.belongsTo(User_1.default, {
    foreignKey: 'UserId'
});
