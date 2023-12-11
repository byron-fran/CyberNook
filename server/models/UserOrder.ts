import User from "./User";
import Order from "./Order";
import {BelongsTo, Table, ForeignKey, Model, Column} from 'sequelize-typescript';


@Table
export default class UserOrder extends Model<UserOrder> {
    @ForeignKey(() => User)
    @Column
    UserId!: number;

    @ForeignKey(() => Order)
    @Column
    OrderId!: number;

    @BelongsTo(() => User, 'OrderId')
    user!: User;

    @BelongsTo(() => Order, 'UserId' )
    order!: Order;
}