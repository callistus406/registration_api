const joi = require("joi");

function registerValidation(data) {
  const schema = joi.object({
    username: joi.string().alphanum().min(3).max(30).required(),
    email: joi
      .string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: joi
      .string()
      .pattern(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        )
      )
      .min(8)
      .max(30)
      .required()
      .label("Password")
      .messages({
        "string.empty": ` password field cannot be empty `,
        "object.regex": "Must have at least 8 characters",
        "string.pattern.base":
          "Minimum eight characters,at least one upper case,one lower case letter , one digit and  one special character,",
      }),
  });
  return schema.validate(data);
}
function loginValidation(data) {
  const schema = joi.object({
    username: joi.string().alphanum().min(3).max(10).required(),

    password: joi
      .string()
      .pattern(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        )
      )
      .min(3)
      .max(10)
      .required()
      .label("Password")
      .messages({
        "object.regex": "Must have at least 8 characters",
        "string.empty": `password field cannot be empty `,
        "string.pattern.base":
          "Minimum eight characters,at least one upper case,one lower case letter , one digit and  one special character,",
      }),
  });
  return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

// .messages({
//   "string.base": `"a" should be a type of 'text'`,
//   "string.empty": `"a" password field cannot be empty `,
//   "string.min": ` password should have a minimum length of {#limit}`,
//   "string.max": ` password should have a maximum length of {#limit}`,
//   "any.required": `"a" password field is required`,
// }),
