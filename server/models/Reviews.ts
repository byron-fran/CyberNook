import {Model, Column, Table, DataType, PrimaryKey, AutoIncrement} from 'sequelize-typescript';


@Table({
    tableName : 'reviews',
    timestamps : true
})
class Reviews extends Model<Reviews>{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id! : number

    @Column(DataType.STRING)
    comment! : string

    @Column(DataType.INTEGER)
    stars!: number

    @Column(DataType.INTEGER)
    likes! : number



    
}

export default Reviews