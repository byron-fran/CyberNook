import { Table, DataType, Model, Column, PrimaryKey, HasMany, BelongsToMany, Default, AutoIncrement } from 'sequelize-typescript';
import UserOrder from './UserOrder';
import User from './User';
import { toDefaultValue } from 'sequelize/types/utils';
import { UUID, UUIDV1, UUIDV4 } from 'sequelize';
import ProductOrder from './ProductOrder';
import Product from './Product';

@Table({
    tableName: 'order',
    timestamps: true
})

class Order extends Model<Order>{

    @PrimaryKey
    @Default(UUID)
    @Column(DataType.UUID,)

    id!: string


    @Column(DataType.STRING)
    name!: string

    @Column(DataType.INTEGER)
    quantity!: number

    @Column(DataType.INTEGER)
    price!: number

    @Column(DataType.STRING)
    image!: string

    @Column(DataType.BOOLEAN)
    paid!: boolean

    @Column(DataType.INTEGER || DataType.STRING)
    UserId!: number | string

    @HasMany(() => UserOrder, 'OrderId')
    userOrders!: Order[]

    @BelongsToMany(() => User, () => UserOrder)
    users!: User[]

    // @HasMany(() => ProductOrder, 'OrderId')
    // productOrders! : Order[]
    // @BelongsToMany(() => Order, () => ProductOrder)
    // products! : Product

}

export default Order