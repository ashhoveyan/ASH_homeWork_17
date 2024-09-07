import {DataTypes,Model} from 'sequelize';
import sequelize from "../clients/sequelize.mysql.js";
import Books from "./Books.js";
import Reviews from "./Reviews.js";
import Comments from "./Comments.js";
import Favorites from "./Favorites.js";

import md5 from "md5";

const {SECRET_FOR_PASSWORD} = process.env

class Users extends Model {
    static hash(password) {
        return  md5(md5(password) + SECRET_FOR_PASSWORD);
    }
}

 Users.init(
     {
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
                },
                set(value) {
                    this.setDataValue("password", Users.hash(value));
                }

            },
            type: {
                type: DataTypes.ENUM('user', 'admin'),
                allowNull: false,
                defaultValue: 'user',
            },
         avatar: {
             type: DataTypes.STRING,
             allowNull: true
         }
    },
    {
        sequelize,
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