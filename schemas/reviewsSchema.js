import Joi from 'joi';

export default {
    createReview: Joi.object({
        review: Joi.string().min(1).max(100).required(),
        rating: Joi.number().min(1).max(5).required(),
    }),
    getReviews: Joi.object({
        page: Joi.number().integer().min(1).max(10000).default(1).optional(),
        limit: Joi.number().integer().min(5).max(20).default(5).optional(),
        order: Joi.string().valid('asc', 'desc').default('desc').optional(),
        orderBy: Joi.string().valid('createdAt', 'updatedAt').default('createdAt').optional(),
    }),
};