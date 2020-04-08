const Joi = require('@hapi/joi')
const provinces = require('../provinces')

const schema = Joi.object({
  webPage: Joi.string()
    .uri()
    .trim()
    .required(),
  company: Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(255)
      .trim()
      .required(),
    province: Joi.string()
      .valid(...provinces.getProvinceKeys())
      .required()
  }).required(),
  jobRecruiter: Joi.object({
    email: Joi.string()
      .email()
      .trim()
      .required(),
    linkedIn: Joi.string()
      .min(3)
      .max(100)
      .pattern(/[a-zA-Z0-9\-]+/)
      .trim()
      .required()
  }).required()
})

module.exports = {
  validate(poisition) {
    return schema.validate(poisition, { stripUnknown: true, abortEarly: false })
  }
}