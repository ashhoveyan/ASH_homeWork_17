import sequelize from '../clients/sequelize.mysql.js';
import { DataTypes, Model } from 'sequelize';

import Books from './Books.js';
import Users from './Users.js';

class Review extends Model {}

Review.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'reviews',
        tableName: 'reviews',
    }
);

Review.belongsTo(Users, { foreignKey: 'userId', as: 'user' });
Review.belongsTo(Books, { foreignKey: 'bookId', as: 'book' });
Users.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
Books.hasMany(Review, { foreignKey: 'bookId', as: 'reviews' });

export default Review;