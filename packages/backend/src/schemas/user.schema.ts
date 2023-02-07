/* eslint-disable newline-per-chained-call */
import Joi from 'joi';

export const userSchema = Joi.object().keys({
  email: Joi.string().min(3).email().required(),
  password: Joi.string().min(3).required(),
  newPassword: Joi.string().min(3),
  avatar: Joi.any()
});
