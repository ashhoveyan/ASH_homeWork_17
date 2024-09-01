import Users from './models/Users.js'
import Books from './models/Books.js'
import Reviews from "./models/Reviews.js";
import Favorites from "./models/Favorites.js";

Users.hasMany(Books, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'userId'
});
Users.hasMany(Reviews, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'userId'
});


Users.hasMany(Favorites, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'userId'
});

Books.belongsTo(Users );


Books.hasMany(Reviews,  {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'bookId'
});
Books.hasMany(Favorites,  {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: 'bookId'
});

Reviews.belongsTo(Users);
Reviews.belongsTo(Books);
Favorites.belongsTo(Users);
Favorites.belongsTo(Books);
const models = [
    Users,
    Books,
    Reviews,
    Favorites
];


(async () => {
    for (const model of models) {
        await model.sync({alter: true})
        console.log(model.name,'TABLE CREATED SUCCESSFULLY')
    }

})();