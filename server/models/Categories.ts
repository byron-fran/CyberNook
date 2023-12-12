import {Column, Table, DataType, PrimaryKey, Model, AutoIncrement} from 'sequelize-typescript';


@Table({
    timestamps : true,
    tableName : 'category'
})
class Category extends Model<Category>{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number

    @Column(DataType.STRING)
    name! : string

    @Column(DataType.STRING)
    image! : string
};

export default Category