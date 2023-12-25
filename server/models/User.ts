import {Model, Table, DataType, PrimaryKey, AutoIncrement, Column, HasMany, BelongsToMany, Default} from 'sequelize-typescript';
import { User  as UserInterface} from '../interfaces/User';
import Order from './Order';

@Table({
    tableName : 'users',
    timestamps : true
})



class User extends Model<User>{
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number;

    @Column(DataType.STRING)
    name!: string

    @Column(DataType.STRING)
    password! : string

    @Column(DataType.STRING)
    email! : string 

    @Column(DataType.STRING)
    phone! : string 

    // @HasMany(() => Order, 'OrderId' )
    // orders! : Order[]

    // @BelongsToMany(() => Order, () => UserOrder, )
    // userOrders! : Order[]


};
 export default User
