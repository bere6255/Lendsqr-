import joi from "joi"

export default async (input: any) => {
		const loginSchema = joi.object({
			amount: joi.number().required().min(500).messages({
				"string.base": "amount should be a type of 'text'",
				"string.empty": "amount cannot be empty",
				"any.required": "amount is required",
			})
		});

		let { error, value } = loginSchema.validate(input, { abortEarly: false });
		let newError
		if (error) {
			newError = error.message.split(".");
		}
	
		return { errors: newError || null, value };
};
