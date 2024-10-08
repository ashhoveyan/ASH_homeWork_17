import {DataTypes, Model} from 'sequelize';
import sequelize from '../clients/sequelize.mysql.js';
import Users from "./Users.js";
import Reviews from "./Reviews.js";


class Comments extends Model {}

Comments.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },

        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'comments',
        tableName: 'comments',
    }
);

export default Comments;