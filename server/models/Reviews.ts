import {Model, Column, Table, DataType, PrimaryKey, AutoIncrement, Default} from 'sequelize-typescript';



@Table({
    tableName : 'reviews',
    timestamps : true
})
class Reviews extends Model<Reviews>{
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number;

    @Column(DataType.STRING)
    comment! : string

    @Column(DataType.INTEGER)
    stars!: number

    @Column(DataType.INTEGER )
    likes! : number

    @Column(DataType.INTEGER)
    ProductId! : number


    
}

export default Reviews