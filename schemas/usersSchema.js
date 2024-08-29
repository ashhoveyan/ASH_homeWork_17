import Joi from 'joi';

export default {
    registration: Joi.object({
        username: Joi.string().min(1).max(25).required(),
        password: Joi.string().min(6).max(32).required(),
    }),
    login: Joi.object({
        username: Joi.string().min(1).max(25).required(),
        password: Joi.string().min(6).max(32).required(),
    }),
}