import {Column, Table, DataType, AutoIncrement, PrimaryKey, Model} from 'sequelize-typescript';
import User from './User';


@Table({
    tableName : 'address',
    timestamps : true
})
class Address extends Model<Address>{

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id! : number

    @Column(DataType.STRING)
    street! :string

    @Column(DataType.STRING)
    city! : string

    @Column(DataType.STRING)
    country! : string

    @Column(DataType.INTEGER)
    postalCode! : number

    @Column(DataType.INTEGER)
    exteriorNumber! : number

}

export default Address