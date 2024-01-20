import {Column, Table, DataType, PrimaryKey, Model, AutoIncrement, Default} from 'sequelize-typescript';


@Table({
    timestamps : true,
    tableName : 'category'
})
class Category extends Model<Category>{
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false 
    })
    id!: string; 

    @Column(DataType.STRING)
    name! : string

    @Column(DataType.STRING)
    image! : string
};

export default Category