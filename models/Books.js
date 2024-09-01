import {Model, DataTypes} from "sequelize";
import sequelize from "../clients/sequelize.mysql.js";



class Books extends Model {}

Books.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'books',
        tableName: 'books',
        indexes: [
            {
                unique: true,
                fields: ['title'],
            },
        ]
    }
);


export default Books;