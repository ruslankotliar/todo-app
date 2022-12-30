import Joi from 'joi';

export const taskSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  complete: Joi.boolean().required(),
  private: Joi.boolean().required()
});
