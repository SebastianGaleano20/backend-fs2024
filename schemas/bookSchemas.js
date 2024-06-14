import Joi from 'joi'

export const bodyBookSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().max(80).required(),
    author: Joi.string().required(),
    description: Joi.string().required(),
    year: Joi.number().optional().prefs({ convert: false }),
  })
})

export const idBookSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().pattern(/^[0-9]+$/, 'Debe ser un número').required()
  })
})

export const updateBookSchema = Joi.object({
  body: bodyBookSchema.extract('body'),
  params: idBookSchema.extract('params')
})