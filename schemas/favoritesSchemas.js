import Joi from 'joi';

export default {
    addFavorite: Joi.object({
        bookId: Joi.number().integer().positive().required(),
    }),

    getFavorites: Joi.object({
        userId: Joi.number().integer().positive().required(),
    }),
}