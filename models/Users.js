import {Model,DataTypes} from 'sequelize';

import sequelize from "../clients/sequelize.mysql.js";

import Books from "./Books.js";

// class Users extends Model {}



const Users = sequelize.define('user', {
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
                // let rawValue = this.getDataValue('password');
                // return rawValue = undefined;
                return undefined
            }
        }
    },
    {
        // sequelize,
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
//
// Users.init(
//     {
//         id: {
//             type: DataTypes.BIGINT.UNSIGNED,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         username: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             get(){
//                 return this.password = undefined
//             }
//         }
//     },
//     {
//         sequelize,
//         timestamps: true,
//         modelName: 'users',
//         tableName: 'users',
//         indexes: [
//             {
//                 unique: true,
//                 fields: ['username'],
//             },
//         ]
//     }
// )

Users.hasMany(Books,{
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: "userId",
})
Books.belongsTo(Users)



export default Users;