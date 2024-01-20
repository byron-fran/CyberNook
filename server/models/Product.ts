import { Table, Column, Model, DataType, AutoIncrement, PrimaryKey, HasMany, BelongsToMany, Unique, Default } from 'sequelize-typescript'



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