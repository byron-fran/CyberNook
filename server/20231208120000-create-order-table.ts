import { QueryInterface, DataTypes, Sequelize} from 'sequelize';

export default {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.createTable('order', {
            
            id: {
                type:DataTypes.UUID,
                defaultValue: Sequelize.literal('uuid_generate_v4()'),
                allowNull: false,
                primaryKey: true,
                unique: true,
            },
            
        });
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.dropTable('order');
    }
};