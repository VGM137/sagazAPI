const Joi = require('@hapi/joi');

const guisadosIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const guisadoTitleSchema = Joi.string().max(80);
const guisadoHotnessSchema = Joi.number().min(0).max(3);
const guisadoCoverSchema = Joi.string().uri();
const guisadoDescriptionSchema = Joi.string().max(300);
const guisadoTags = Joi.array().items(Joi.string().max(50));
const guisadoGalery = Joi.array().items(Joi.string().uri());

const createGuisadoSchema = {
  title: guisadoTitleSchema.required(),
  hotness: guisadoHotnessSchema.required(),
  cover: guisadoCoverSchema.required(),
  description: guisadoDescriptionSchema.required(),
  type: guisadoTags.required(),
  galery: guisadoGalery
};

const uptadeGuisadoSchema = {
  title: guisadoTitleSchema,
  hotness: guisadoHotnessSchema,
  cover: guisadoCoverSchema,
  description: guisadoDescriptionSchema,
  type: guisadoTags,
  galery: guisadoGalery
};

module.exports = {
  guisadosIdSchema,
  createGuisadoSchema,
  uptadeGuisadoSchema
};