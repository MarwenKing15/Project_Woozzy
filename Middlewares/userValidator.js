const { body, validationResult } = require("express-validator");

exports.registerValidator = () => [
	body("First_Name", "First Name is Required").notEmpty(),
	body("Last_Name", "Last Name is Required").notEmpty(),
	body("Email", "Enter a valid email").isEmail(),
	body("Password", "Password must contain minimum of 8 characters").isLength({
		min: 8,
	}),
	body("Username", "Username is Required").notEmpty(),
];

exports.loginValidator = () => [
	body("Email", "Enter a valid email").isEmail(),
	body("Password", "Password must contain minimum of 8 characters").isLength({
		min: 8,
	}),
];

exports.validations = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};
