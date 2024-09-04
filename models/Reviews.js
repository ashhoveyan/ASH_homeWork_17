import sequelize from '../clients/sequelize.mysql.js';
import { DataTypes, Model } from 'sequelize';
import Users from "./Users.js";
import Books from "./Books.js";
import Comments from "./Comments.js";


class Reviews extends Model {}


Reviews.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        review: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rating: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        }
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'reviews',
        tableName: 'reviews',

    }
);



export default Reviews;