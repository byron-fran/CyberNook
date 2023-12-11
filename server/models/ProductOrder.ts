import { Table, Model, ForeignKey, BelongsTo, Column } from "sequelize-typescript";
import Product from "./Product";
import Order from "./Order";


export default class ProductOrder extends Model<ProductOrder>{
    @ForeignKey(() => Order)
    @Column
    OrderId! : string | number

    @ForeignKey(() => Product)
    @Column
    ProductId! : string | number

    @BelongsTo(() => Order, 'ProductId')
    product! : Product

    @BelongsTo(()=> Product, 'OrderId')
    order! : Order
}


