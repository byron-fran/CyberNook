import {Sequelize} from 'sequelize-typescript';
import dotenv from 'dotenv';
import Product from '../models/Product';
import User from '../models/User';
import Order from '../models/Order';
import Spces from '../models/Specs';
import Category from '../models/Categories';
import Address from '../models/Address';
import Mark from '../models/Mark';
import Reviews from '../models/Reviews';
import Question from '../models/Question';

dotenv.config()

// Configuración de la base de datos
export const sequelize = new Sequelize(`${process.env.POSTGRES_URL}`, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
    models: [Product, User, Address, Order, Spces, Category, Mark, Reviews, Question],
  });

//Order / User
User.hasMany(Order, {
     onDelete : 'CASCADE'
});

Order.belongsTo(User, {
    foreignKey : 'UserId',
    
})

//Relations address /user
User.hasMany(Address, {
    onDelete : 'CASCADE'
});

Address.belongsTo(User, {
    foreignKey : 'UserId'
});

//Relations marks /product
Mark.hasMany(Product, {
    onDelete : "CASCADE"
});
Product.belongsTo(Mark, {
    foreignKey : 'MarkId'
})

//Ralations Products / Order
Product.hasMany(Order, {
    onDelete : 'CASCADE'
});
Order.belongsTo(Product, {
    foreignKey : 'ProductId'
})

//Relations Reviews / Product
Product.hasMany(Reviews, {
    onDelete : 'CASCADE'
})
Reviews.belongsTo(Product, {
    foreignKey : 'ProductId'
})

//Relations Reviews / user
User.hasMany(Reviews, {
    onDelete : 'CASCADE'
})
Reviews.belongsTo(User, {
    foreignKey : 'UserId'
})


//Relations Category / Product
Category.hasMany(Product, {
    onDelete : 'CASCADE'
})
Product.hasOne(Category, {
    foreignKey : 'CategoryId'
})
//Relations specs / product
Product.hasOne(Spces, {
    onDelete : 'CASCADE',
})
Spces.belongsTo(Product, {
    foreignKey : 'ProductId'
});

//Relations Question / User

User.hasMany(Question, {
    onDelete : 'CASCADE'
});

Question.belongsTo(User, {
    foreignKey: 'UserId'
});
