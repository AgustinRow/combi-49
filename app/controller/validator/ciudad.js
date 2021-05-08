const joi = require("joi");

function createAccountSchema(req, res, next) {
  const schema = Joi.object({
    nombre: Joi.string().required(),
    habilitado: Joi.boolean().required(),
  });
  validateRequest(req, next, schema);
}

function updateAccountSchema(req, res, next) {
  const schemaRules = {
    nombre: Joi.string().empty(""),
  };

  // if (req.user.role === 'Admin') {
  //     schemaRules.role = Joi.string().valid('Admin', 'User').empty('');
  // }
  const schema = Joi.object(schemaRules).with("password", "confirmPassword");
  validateRequest(req, next, schema);
}
function validateRequest(req, next, schema) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    next(`Validation error: ${error.details.map((x) => x.message).join(", ")}`);
  } else {
    req.body = value;
    next();
  }
}
