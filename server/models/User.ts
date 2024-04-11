import {Model, Table, DataType, PrimaryKey, AutoIncrement, Column, BelongsToMany, } from 'sequelize-typescript';
import Product from './Product';
import UserProduct from './UserProducts';

@Table({
    tableName : 'users',
    timestamps : true
})
class User extends Model<User>{

    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false 
    })
    id!: string; 
    
    @Column(DataType.STRING)
    name: string = ''

    @Column(DataType.STRING)
    password! : string

    @Column(DataType.STRING)
    email! : string 

    @Column(DataType.STRING)
    phone! : string 

    @Column(DataType.BOOLEAN)
    isAdmin! : boolean

    @BelongsToMany(() => Product, () =>UserProduct)
    products! : Product []

};


 export default User
