//validation using Joi
const Joi = require("joi");

//signUp validation
const registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(5).max(100).required(),
    lastName: Joi.string().min(5).max(100).required(),
    birthDate: Joi.string().min(5).max(100).required(),
    city: Joi.string().min(5).max(100).required(),
    country: Joi.string().min(5).max(100).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    confirmPassword: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(data);
};

//SignIn validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(data);
};

//registerEvent validation
const eventValidation = (data) => {
  const schema = Joi.object({
    description: Joi.string().min(5).max(255).required(),
    dayOfWeek: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.eventValidation = eventValidation;
