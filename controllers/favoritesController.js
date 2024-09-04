import Favorites from '../models/Favorites.js';
import Books from "../models/Books.js";


export default {
    async addFavorite(req, res) {
        try {
            const { bookId } = req.query;
            const { id } = req.user;

            const [favorite, created] = await Favorites.findOrCreate({
                where: {
                    userId: id,
                    bookId: bookId,
                },
            });

            if (!created) {
                return res.status(200).json({
                    message: 'Favorite already exists',
                    favorite: favorite,
                });
            }

            return res.status(201).json({
                message: 'Favorite added successfully',
                favorite: favorite,
            });

        } catch (err) {
            console.error("Server Error:", err);
            return res.status(500).json({
                message: "Server error",
                error: err.message
            });
        }
    },
    async getFavorites(req, res) {
        try {
            const { id } = req.user;
            const total = await Books.count()

            let page = +req.query.page;
            let limit = +req.query.limit;
            let offset = (page - 1) * limit;

            const favorites = await Favorites.findAll({
                where: { userId: id },
                include: [
                    {
                        model: Books,
                    }
                ],
                limit,
                offset
            });

            if (favorites.length > 0) {
                return res.status(200).json({
                    favorites: favorites,
                });
            } else {
                return res.status(200).json({
                    message: "No favorites found",
                    favorites: [],
                });
            }

        } catch (error) {
            console.error("Server Error:", error);
            return res.status(500).json({
                message: "Server error",
                error: error.message
            });
        }
    }
}
