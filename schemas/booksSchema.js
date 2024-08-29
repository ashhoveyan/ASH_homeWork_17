import Joi from 'joi';

export default {
    book: Joi.object({
        title: Joi.string().min(1).max(50).required(),
        author: Joi.string().min(1).max(25).required(),
    }),

}