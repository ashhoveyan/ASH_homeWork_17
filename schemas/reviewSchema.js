import Joi from 'joi';

export default {
    createReview: Joi.object({
        review: Joi.string().min(1).max(100).required(),
        rating: Joi.number().min(1).max(5).required(),
    }),
};