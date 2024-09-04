import sequelize from '../clients/sequelize.mysql.js';
import { DataTypes, Model } from 'sequelize';
import Users from "./Users.js";
import Books from "./Books.js";

class Favorites extends Model {}


Favorites.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,

        },

    },
    {
        sequelize,
        timestamps: true,
        modelName: 'favorites',
        tableName: 'favorites',

    }

)


export default Favorites;