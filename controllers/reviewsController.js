import Books from "../models/Books.js"
import Reviews from "../models/Reviews.js";
import Users from '../models/Users.js';
import {Sequelize} from "sequelize";

export default {
    createReview: async (req, res) => {
        try {
            const { id: userId } = req.user;
            const { review, rating } = req.body;
            const { id: bookId } = req.query;

            const book = await Books.findOne({
                where: { id: bookId }
            });

            if (!book) {
                return res.status(404).json({ message: "Book not found." });
            }

            const [reviews,created]= await Reviews.findOrCreate({
                where: { userId: userId, bookId: bookId },
                defaults:{
                    review:review,
                    rating:rating,
                    userid:userId,
                    bookId:bookId,
                }
            })

            if (!created) {
                return res.status(409).json({
                    message: 'You have already submitted a review for this book.',
                    book: book,
                    review: reviews
                });
            }

            res.status(201).json({
                message: 'Review created successfully',
                book: book,
                review: reviews
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while creating the review' });
        }
    },
    getReviews: async (req, res) => {
        try{

            const { bookId } = req.query;

            if (!bookId) {
                return res.status(400).json({
                    message: "Invalid request: bookId is required."
                });
            }

            const book = await Books.findOne({
                where: { id: bookId }
            });

            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            const booksReviews = await Reviews.findAll({
                where: { bookId: bookId },

                include: [
                    {
                        model: Books,
                    },
                    {
                        model: Users,
                        attributes: ['id', 'username']
                    }
                ],
            });

            const ratings = booksReviews.map(review => parseInt(review.rating, 10));
            const totalRatings = ratings.reduce((sum, rating) => sum + rating, 0);
            const averageRating = ratings.length > 0 ? totalRatings / ratings.length : null;

            res.status(200).json({
                book,
                booksReviews,
                averageRating
            });
        }catch (error) {
            res.status(500).json({
                message: "An error occurred while retrieving reviews.",
                error: error.message
            });
        }
    },
     getReviewSummary:async(req, res) =>{
        const {userId} = req.params;

        try {
            const userExists = await Users.findByPk(userId);

            if (!userExists) {
                return res.status(404).json({
                    message: 'User not found.'
                });
            }

            const reviewSummary = await Reviews.findOne({
                attributes: [
                    [Sequelize.fn('COUNT', Sequelize.col('id')), 'totalReviews'],
                    [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating'],
                    [Sequelize.fn('COUNT', Sequelize.col('bookId')), 'totalBooksReviewed'],
                ],
                where: { userId }
            });

            if (!reviewSummary) {
                return res.status(404).json({
                    message: 'No reviews found for this user',
                    reviewSummary: []
                });
            }

            return res.status(200).json({
                message: 'User review summary retrieved successfully.',
                reviewSummary
            });
        } catch (error) {
            console.error('Error fetching review summary:', error);
            return res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    }


}