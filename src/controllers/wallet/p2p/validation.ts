import joi from "joi"

export default async (input: any) => {
		const loginSchema = joi.object({
			amount: joi.number().required().min(500).messages({
				"string.base": "amount should be a type of 'text'",
				"string.empty": "amount cannot be empty",
				"any.required": "amount is required",
			}),
			to: joi.string().required().messages({
				"string.base": "To should be a type of 'text'",
				"string.empty": "To cannot be empty",
				"any.required": "To is required",
			}),
		});

		let { error, value } = loginSchema.validate(input, { abortEarly: false });
		let newError
		if (error) {
			newError = error.message.split(".");
		}
	
		return { errors: newError || null, value };
};
