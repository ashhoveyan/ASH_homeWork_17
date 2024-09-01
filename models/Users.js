import {DataTypes} from 'sequelize';

import sequelize from "../clients/sequelize.mysql.js";



const Users = sequelize.define('users', {
    id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {

                return undefined
            }
        }
    },
    {
        timestamps: true,
        modelName: 'users',
        tableName: 'users',
        indexes: [
            {
                unique: true,
                fields: ['username'],
            },
        ]
});




export default Users;