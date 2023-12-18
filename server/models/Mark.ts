import {Column, DataType, Table, Model, Default,PrimaryKey, AutoIncrement, } from 'sequelize-typescript';


@Table({
    tableName : 'marks',
    timestamps : false
})
class Mark extends Model<Mark>{
    // @Default(DataType.UUIDV4)
    // @PrimaryKey
    // @Column({
    //   type: DataType.UUID,
    //   defaultValue: DataType.UUIDV4,
      
    // })
  
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column(DataType.STRING)
    name! : string

}
export default Mark