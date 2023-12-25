import {Model, AutoIncrement, Table, DataType, PrimaryKey, Column, Default} from 'sequelize-typescript';

@Table({
    tableName : 'specs',
    timestamps : true
})

class Spces extends Model<Spces>{
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number;

    @Column (DataType.STRING)
    model! : string

    @Column (DataType.STRING)
    ram! : string

    @Column(DataType.STRING)
    memory! : string

    @Column(DataType.STRING)
    color! : string

    @Column(DataType.STRING)
    size! : string

    @Column(DataType.STRING)
    weight! :string

    @Column (DataType.STRING)
    mesasures! : string

    @Column(DataType.INTEGER)
    productId! : number

};
export default Spces