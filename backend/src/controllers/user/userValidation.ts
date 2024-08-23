import Joi from 'joi'

export const userSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

export const jwtTokenSchema = Joi.object({
    token: Joi.string().required()
})