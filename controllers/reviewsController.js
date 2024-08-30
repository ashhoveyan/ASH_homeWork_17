import Review from '../models/Reviews.js';


export default {
    createReview: async (req, res) => {
        try {
            const { id: userId } = req.user;
            const { review, rating } = req.body;
            const { id: bookId } = req.params;


            const data = await Review.create({ review, rating, userId, bookId });
            res.status(201).json({ message: 'Review created successfully', data });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while creating the review' });
        }
    },
}