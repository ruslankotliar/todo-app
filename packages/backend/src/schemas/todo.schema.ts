/* eslint-disable newline-per-chained-call */
import Joi from 'joi';

export const taskSchema = Joi.object().keys({
  title: Joi.string().max(50).required(),
  description: Joi.string().allow('').trim(),
  private: Joi.boolean(),
  completed: Joi.boolean(),
  userID: Joi.string().min(1).required()
});
