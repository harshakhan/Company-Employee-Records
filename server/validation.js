const Joi = require("joi")

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  })
  return schema.validate(data)
}

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  })

  return schema.validate(data)
}

const employeeValidator = data => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    department: Joi.string().min(1).max(255).required(),
    gender: Joi.string().min(1).max(1).required(),
    joining_date: Joi.number().min(1).max(150).required()
  })
  return schema.validate(data).error
}


module.exports = { registerValidation, loginValidation, employeeValidator }