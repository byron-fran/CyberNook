import {Model, Column, Table, DataType, PrimaryKey, AutoIncrement, Default} from 'sequelize-typescript';



@Table({
    tableName : 'reviews',
    timestamps : true
})
class Reviews extends Model<Reviews>{
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false 
    })
    id!: string; 

    @Column(DataType.STRING)
    comment! : string

    @Column(DataType.INTEGER)
    stars!: number

    @Column(DataType.INTEGER )
    likes! : number

    @Column(DataType.UUID)
    ProductId! : string


    
}

export default Reviews