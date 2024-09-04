import Users from '../models/Users.js';
import Books from "../models/Books.js";
import Reviews from "../models/Reviews.js";
import Category from "../models/Category.js";
import error from "jsonwebtoken/lib/JsonWebTokenError.js";

export default {
    addCategory: async (req, res) => {
        try {
            const {name} = req.body;

            const existingCategory = await Category.findOne({
                where: { name }
            });
            if (existingCategory) {
                return res.status(409).json({
                    message: 'Category already exists',
                    category: existingCategory
                });
            }
            const category = await Category.create({name})
            return res.status(201).json({
                message:'category added successfully',
                category
            })
        }catch(error) {
            console.error('Error adding category:', error);
            return res.status(500).json({
                message: 'An error occurred while adding the category',
                error: error.message
            });
        }
    },
    getUsers: async (req, res) => {
        try {
            const total = await Users.count()

            // const order = req.query.order;
            // const orderBy = req.query.orderBy;

            let page = +req.query.page;
            let limit = +req.query.limit;
            let offset = (page - 1) * limit;


            const maxPageCount = Math.ceil(total / limit);

            if (page > maxPageCount) {
                return   res.status(404).json({
                    message: 'User does not found',
                });
            }

            const users = await Users.findAll({
                offset,
                limit,
                // order:[
                //     [orderBy,order]
                // ]
            })

            return res.status(200).json({
                message:'Users retrieved successfully',
                users,
                page,
                maxPageCount,
                total
            })

        }catch(error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({
                message: 'An error occurred while retrieving users',
                error: error.message
            });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const {userId} = req.query;
            const userToDelete = await Users.findByPk(userId)
            if (!userToDelete) {
                return  res.status(404).json({
                    message: 'User does not found',
                })
            }
            await userToDelete.destroy()

            return res.status(200).json({
                message: 'User deleted successfully',
            })


        }catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({
                message: 'An error occurred while deleting the user',
                error: error.message,
            });
        }


    },
    deleteReview: async (req, res) => {
        try {
            const reviewId = req.query;

            const reviewToDelete = await Reviews.findByPk(reviewId);
            if (!reviewToDelete) {
                return res.status(404).json({
                    message:'Review not found'
                })
            }

            await reviewToDelete.destroy()
            return res.status(200).json({
                message: 'Review deleted successfully',
            })
        }catch (error) {
            console.error('Error deleting review:', error);
            return res.status(500).json({
                message: 'An error occurred while deleting the review',
                error: error.message,
            });
        }
    }
}