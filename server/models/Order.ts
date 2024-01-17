import { Table, DataType, Model, Column, PrimaryKey, HasMany, BelongsToMany, Default, AutoIncrement } from 'sequelize-typescript';

import User from './User';
import { toDefaultValue } from 'sequelize/types/utils';
import { UUID, UUIDV1, UUIDV4 } from 'sequelize';
import Product from './Product';

@Table({
  tableName: 'order',
  timestamps: true
})

class Order extends Model<Order> {

  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;


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

  @Column(DataType.INTEGER)
  unitPrice!: number

  @Column(DataType.INTEGER)
  UserId!: number

  @Column({
    type : DataType.INTEGER,
    defaultValue : 0
  })
  discount! : number

  @Column(DataType.INTEGER)
  saved! : number

  @Column(DataType.INTEGER)
  ProductId!: number
  // @HasMany(() => User, 'UserId')
  // userOrders!: Order[]

  // @BelongsToMany(() => User, () => UserOrder)
  // usersOrders!: User[]

  // @HasMany(() => ProductOrder, 'OrderId')
  // productOrders! : Order[]
  // @BelongsToMany(() => Order, () => ProductOrder)
  // products! : Product

}

export default Order