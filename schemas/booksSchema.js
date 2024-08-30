import Joi from 'joi';

export default {
    addBook: Joi.object({
        title: Joi.string().min(1).max(50).required(),
        author: Joi.string().min(1).max(25).required(),
    }),
    getBooks: Joi.object({
        page: Joi.number().integer().min(1).max(10000).default(1).optional(),
        limit : Joi.number().integer().min(5).max(25).default(1).optional(),
    }),

}