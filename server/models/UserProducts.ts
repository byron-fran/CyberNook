import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { sequelize } from "../connection/db";

import User from "./User"
import Product from "./Product"
import { DataTypes } from "sequelize";

@Table
class UserProduct extends Model {
  @ForeignKey (( ) => Product)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false 
  })
  ProductId! : string

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false 
  })
  UserId!: string
}



export default UserProduct