const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(5).max(100).required(),
    lastName: Joi.string().min(5).max(100).required(),
    birthDate: Joi.string().min(5).max(100).required(),
    city: Joi.string().min(5).max(100).required(),
    country: Joi.string().min(5).max(100).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(5).max(100).required(),
    lastName: Joi.string().min(5).max(100).required(),
    birthDate: Joi.string().min(5).max(100).required(),
    city: Joi.string().min(5).max(100).required(),
    country: Joi.string().min(5).max(100).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
};
