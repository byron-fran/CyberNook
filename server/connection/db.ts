import {Sequelize} from 'sequelize-typescript';
import dotenv from 'dotenv';
import Product from '../models/Product';
import User from '../models/User';
import Order from '../models/Order';
import Spces from '../models/Specs';
import UserOrder from '../models/UserOrder';
import Category from '../models/Categories';

dotenv.config()

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [Product, User, Order, Spces, UserOrder, Category] 

})


User.belongsToMany(Order, {through : UserOrder })
Order.belongsToMany(User, {through : UserOrder})

//
Category.hasMany(Product, {
    onDelete : 'CASCADE'
})
Product.hasOne(Category, {
    foreignKey : 'categoryId'
})

Product.hasOne(Spces, {
    onDelete : 'CASCADE',


})
Spces.belongsTo(Product, {
    onDelete : 'CASCADE'
})