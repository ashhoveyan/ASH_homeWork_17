import sequelize from '../clients/sequelize.mysql.js';
import { DataTypes, Model } from 'sequelize';

import Books from './Books.js';
import Users from './Users.js';

class Reviews extends Model {}


Reviews.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: Users,
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        bookId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: Books,
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
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

Reviews.belongsTo(Users, {onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: "userId",
});

Reviews.belongsTo(Books, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: "bookId",
});

export default Reviews;