import sequelize from '../clients/sequelize.mysql.js';
import { DataTypes, Model } from 'sequelize';

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
            type: DataTypes.STRING(255),
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
        modelName: 'Reviews',
        tableName: 'reviews',
        indexes: [
            { fields: ['userId'] },
            { fields: ['bookId'] }
        ]
    }
);



export default Reviews;