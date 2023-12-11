import {Model, Table, DataType, PrimaryKey, AutoIncrement, Column, HasMany, BelongsToMany} from 'sequelize-typescript';
import { User  as UserInterface} from '../interfaces/User';
import Order from './Order';
import UserOrder from './UserOrder';
@Table({
    tableName : 'users',
    timestamps : true
})



class User extends Model<User, UserInterface>{
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id! : number | string

    @Column(DataType.STRING)
    name!: string

    @Column(DataType.STRING)
    password! : string

    @Column(DataType.STRING)
    email! : string 

    @HasMany(() => Order, 'UserId' )
    orders! : Order[]

    @BelongsToMany(() => Order, () => UserOrder, )
    userOrders! : Order[]



};
 export default User
