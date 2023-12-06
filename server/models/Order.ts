import {Table, DataType,Model, AutoIncrement, Column, PrimaryKey } from 'sequelize-typescript';


@Table({
    tableName : 'order',
    timestamps : true
})

class Order extends Model<Order>{
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id! : string

    @Column(DataType.STRING)
    name! : string

    @Column (DataType.INTEGER)
    quantity! : number

    @Column (DataType.INTEGER)
    price! : number

    @Column (DataType.STRING)
    image! : string

    @Column (DataType.BOOLEAN)
    paid! : boolean

    @Column(DataType.INTEGER || DataType.STRING)
    userId! : number | string

}

export default Order