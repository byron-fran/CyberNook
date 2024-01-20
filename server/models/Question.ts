import {Column, Table, DataType, Model, AutoIncrement, PrimaryKey, Default} from 'sequelize-typescript';

@Table({
    tableName: 'question',
    timestamps: true
})

class Question extends Model<Question>{

    // id must be uuid
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false 
    })
    id!: string; 

    @Column(DataType.STRING)
    email!: string

    @Column(DataType.STRING)
    description!: string

}
export default Question