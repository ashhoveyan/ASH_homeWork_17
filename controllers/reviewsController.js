import Books from "../models/Books.js"
import Reviews from "../models/Reviews.js";


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
    getReviewsByBookId: async (req, res) => {
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
                where: { bookId: bookId }
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
    }
}