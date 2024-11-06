import joi from "joi"

export default async (input: any) => {
		const loginSchema = joi.object({
			reference: joi.string().required().messages({
				"string.base": "Reference should be a type of 'text'",
				"string.empty": "Reference cannot be empty",
				"any.required": "Reference is required",
			})
		});

		let { error, value } = loginSchema.validate(input, { abortEarly: false });
		let newError
		if (error) {
			newError = error.message.split(".");
		}
	
		return { errors: newError || null, value };
};
