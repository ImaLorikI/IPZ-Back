import Joi from "joi";

export const createBookSchema = Joi.object({
  name: Joi.string().required(),
  author: Joi.string().email().required(),
  genre: Joi.string().required(),
});

export const updateBookSchema = Joi.object({
  name: Joi.string(),
  author: Joi.string().email(),
  genre: Joi.string(),
});

export const patchBookSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
