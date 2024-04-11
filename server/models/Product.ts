import { Table, Column, Model, DataType, AutoIncrement, PrimaryKey, HasMany, BelongsToMany, Unique, Default,

 } from 'sequelize-typescript'
import User from './User';
import UserProduct from './UserProducts';


@Table({
  tableName: 'productos',
  timestamps: true
})

class Product extends Model<Product> {
  @PrimaryKey
  @Column({
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      allowNull: false 
  })
  id!: string; 
   
  @Column(DataType.STRING)
  name!: string 

  @Column(DataType.INTEGER)
  price!: number

  @Column(DataType.STRING)
  image!: string

  @Column(DataType.STRING)
  category!: string

  @Column(DataType.INTEGER)
  stock!: number

  @Column(DataType.STRING)
  mark!: string

  @Column({
    type : DataType.INTEGER,
    defaultValue : 0
  })
  discount! : number

  @Column(DataType.TEXT)
  description! : string

  @BelongsToMany(() => User, () => UserProduct)
  users! : User[]

};

export default Product;



