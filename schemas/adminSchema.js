import Joi from 'joi';

export default {
    addCategory: Joi.object({
        name: Joi.string().min(2).max(20).trim().required(),
    }),
    getUsers: Joi.object({
        page: Joi.number().integer().min(1).max(1000000).default(1).optional(),
        limit: Joi.number().integer().min(5).max(20).default(5).optional(),
    }),
    deleteUser: Joi.object({
        userId: Joi.number().integer().min(1).max(20).required(),
    }),
    deleteReview: Joi.object({
        reviewId: Joi.number().integer().min(1).max(20).required(),
    })
}