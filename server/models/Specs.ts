import {Model, AutoIncrement, Table, DataType, PrimaryKey, Column, Default} from 'sequelize-typescript';

@Table({
    tableName : 'specs',
    timestamps : true
})

class Specs extends Model<Specs>{

    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false 
    })
    id!: string; 

    @Column (DataType.STRING)
    model! : string

    @Column (DataType.STRING)
    ram? : string

    @Column(DataType.STRING)
    memory? : string

    @Column(DataType.STRING)
    color! : string

    @Column(DataType.STRING)
    screen? : string

    @Column(DataType.STRING)
    weight! :string

    @Column (DataType.STRING)
    mesasures! : string

    @Column(DataType.UUID)
    ProductId! : string

};
export default Specs