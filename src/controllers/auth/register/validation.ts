const joi = require("joi");

export default async (input: any) => {
	const registerSchema = joi.object({
		firstName: joi.string().required().messages({
			"string.base": "First name should be a type of 'text'",
			"string.empty": "First name cannot be empty",
			"any.required": "First name is required",
		}),
		lastName: joi.string().required().messages({
			"string.base": "Last name should be a type of 'text'",
			"string.empty": "Last name cannot be empty",
			"any.required": "Last name is required",
		}),
		email: joi.string().trim().email({ minDomainSegments: 2 }).required().messages({
			"string.base": "Email should be a type of 'text'",
			"string.empty": "Email cannot be empty",
			"string.email": "This is not a valid email",
			"any.required": "Email is required",
		}),
		password: joi.string().min(8).required().messages({
			"string.base": "Password should be a type of 'text'",
			"string.empty": "Password cannot be empty",
			"string.min": "Password must be minimum of 8 characters",
		}),
	});

	let { error, value } = registerSchema.validate(input, { abortEarly: false });
	let newError
	if (error) {
		newError = error.message.split(".");
	}

	return { errors: newError || null, value };
};
