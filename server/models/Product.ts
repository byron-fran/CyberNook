import {Table, Column, Model, DataType,AutoIncrement, PrimaryKey,HasMany, BelongsToMany, Unique, Default} from 'sequelize-typescript'
import { sequelize } from '../connection/db';
import Order from './Order';
import ProductOrder from './ProductOrder';

@Table({
    tableName : 'productos',
    timestamps : true
})

class Product extends Model <Product> {
    @Default(DataType.UUIDV4)
    @PrimaryKey
    @Column({
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      
    })
    id?: string | number;

    @Column(DataType.STRING)
    name! : string

    @Column(DataType.INTEGER)
    price! : number

    @Column(DataType.STRING)
    image! : string
    
    @Column (DataType.STRING)
    category!: string

    @Column(DataType.INTEGER)
    stock! : number

    @Column(DataType.STRING)
    mark! : string

    // @HasMany(() => ProductOrder, 'ProductId')
    // productOrders! : Product[]

    // @BelongsToMany(() => Product, () => ProductOrder)
    // orders! : Order[]

    
};

export default Product;




//Opcion 2

// class Product extends Model{}

// Product.init({
//     id : {
//         type : DataType.INTEGER,
//         autoIncrement : true,
//         primaryKey : true,
//         unique : true
//     },
//     name : {
//         type : DataType.STRING
//     },
//     price : {
//         type : DataType.INTEGER,

//     },
//     image : {
//         type : DataType.STRING
//     },

// }, {sequelize})
// Product.sync({force : false})
// export default Product