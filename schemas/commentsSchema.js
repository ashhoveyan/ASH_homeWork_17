import Joi from 'joi';

export default {
    reviewId:Joi.object({
        reviewId:Joi.number().min(1).required(),
    }),
    addComments:Joi.object({
        comment:Joi.string().min(1).max(100).required(),
    })
}