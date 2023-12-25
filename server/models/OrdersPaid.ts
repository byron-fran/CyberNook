import { Table, DataType, Model, Column, PrimaryKey, HasMany, BelongsToMany, Default, AutoIncrement, BelongsTo } from 'sequelize-typescript';


@Table({
  tableName: 'ordersPaid',
  timestamps: true
})

class OrderPaid extends Model<OrderPaid> {

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

  @Column(DataType.STRING)
  ProductId!: string

}

export default OrderPaid