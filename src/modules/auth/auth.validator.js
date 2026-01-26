const Joi = require("joi");

/**
 * Common validate middleware
 */
const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false, // show all errors
      stripUnknown: true, // remove extra fields
    });

    if (error) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.details.map((d) => d.message),
      });
    }

    req[property] = value; // sanitized data
    next();
  };
};

/**
 * Schemas
 */
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).max(50).optional(),
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});

const verifyEmailSchema = Joi.object({
  token: Joi.string().required(),
});

/**
 * Exports (used directly in routes)
 */
module.exports = {
  login: validate(loginSchema),
  signUp: validate(signUpSchema),
  refreshToken: validate(refreshTokenSchema),
  forgotPassword: validate(forgotPasswordSchema),
  resetPassword: validate(resetPasswordSchema),
  changePassword: validate(changePasswordSchema),
  verifyEmail: validate(verifyEmailSchema),
};
