import {Sequelize} from 'sequelize-typescript';
import dotenv from 'dotenv';
import Product from '../models/Product';
import User from '../models/User';
import Order from '../models/Order';
import Spces from '../models/Specs';
import UserOrder from '../models/UserOrder';
import Category from '../models/Categories';
import Address from '../models/Address';
import Mark from '../models/Mark';
import Reviews from '../models/Reviews';



dotenv.config()

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [
        Product, 
        User,
        Address, 
        Order, 
        Spces, 
        UserOrder, 
        Category,
        Mark,
        Reviews
    ] 

})


User.hasMany(Order, {

     onDelete : 'CASCADE'
});

Order.belongsTo(User, {
    foreignKey : 'UserId'
})

User.hasMany(Address, {
    onDelete : 'CASCADE'
});

Address.belongsTo(User, {
    foreignKey : 'UserId'
});

Mark.hasMany(Product, {
    onDelete : "CASCADE"
});
Product.belongsTo(Mark, {
    foreignKey : 'MarkId'
})

Product.hasMany(Product, {
    onDelete : 'CASCADE'
});
Order.belongsTo(Product, {
    foreignKey : 'ProductId'
})

Product.hasMany(Reviews, {
    onDelete : 'CASCADE'
})
Reviews.belongsTo(Product, {
    foreignKey : 'ProductId'
})
User.hasMany(Reviews, {
    onDelete : 'CASCADE'
})
Reviews.belongsTo(User, {
    foreignKey : 'UserId'
})
User.belongsToMany(Order, {through : 'UserOrder' })
Order.belongsToMany(User, {through : 'UserOrder'})

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