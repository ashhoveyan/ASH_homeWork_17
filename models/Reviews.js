import sequelize from '../clients/sequelize.mysql.js';
import { DataTypes, Model } from 'sequelize';

import Book from './Books.js';
import User from './Users.js';

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
            validate: {
                min: 1,
                max: 5,
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'Review',
        tableName: 'reviews',
    }
);

Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Review.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });
User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
Book.hasMany(Review, { foreignKey: 'bookId', as: 'reviews' });

export default Review;