import {Table, DataType,Model, AutoIncrement, Column, PrimaryKey, HasMany, BelongsToMany } from 'sequelize-typescript';
import UserOrder from './UserOrder';
import User from './User';

@Table({
    tableName : 'order',
    timestamps : true
})

class Order extends Model<Order>{
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id! : string

    @Column(DataType.STRING)
    name! : string

    @Column (DataType.INTEGER)
    quantity! : number

    @Column (DataType.INTEGER)
    price! : number

    @Column (DataType.STRING)
    image! : string

    @Column (DataType.BOOLEAN)
    paid! : boolean

    @Column(DataType.INTEGER || DataType.STRING)
    UserId! : number | string

    @HasMany (() => UserOrder,'OrderId')
    userOrders! : Order[]

    @BelongsToMany (() => User, () => UserOrder)
    users! : User[]

}

export default Order