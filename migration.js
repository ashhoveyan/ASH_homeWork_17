import Users from './models/Users.js'
import Books from './models/Books.js'
import Reviews from "./models/Reviews.js";
import Comments from "./models/Comments.js";
import Category from "./models/Category.js";
import Favorites from "./models/Favorites.js";
import BookCategory from "./models/BookCategory.js";

Users.hasMany(Books, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'userId'
});
Books.belongsTo(Users );

Users.hasMany(Favorites, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'userId'
});
Favorites.belongsTo(Users);

Users.hasMany(Comments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'userId'
});
Comments.belongsTo(Users);

Reviews.belongsTo(Users, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'userId'
});

Books.hasMany(Reviews, { foreignKey: 'bookId' });

Books.hasMany(Favorites,  {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'bookId'
});
Favorites.belongsTo(Books);

Books.belongsToMany(Category, {through: BookCategory})
Category.belongsToMany(Books, {through: BookCategory});
Reviews.belongsTo(Books, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'bookId'
});

Reviews.hasMany(Comments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'reviewId'
});
Comments.belongsTo(Reviews);



const models = [
    Users,
    Books,
    Reviews,
    Comments,
    Favorites,
    Category,
    BookCategory
];

(async () => {
    for (const model of models) {
        await model.sync({alter: true})
        console.log(model.name,'TABLE CREATED SUCCESSFULLY')
    }

})();