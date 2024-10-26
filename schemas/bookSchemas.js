import Joi from "joi";

export const createBookSchema = Joi.object({
  name: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().required(),
});

export const updateBookSchema = Joi.object({
  name: Joi.string(),
  author: Joi.string(),
  genre: Joi.string(),
});

