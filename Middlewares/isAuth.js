const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const isAuth = async (req, res, next) => {
	try {
		const token = req.headers["authorization"];

		console.log({ tokennnn: token });
		if (!token) {
			return res
				.status(401)
				.send({ errors: [{ msg: "You are not authorized" }] });
		}
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		const userToFind = await User.findOne({ _id: decoded.id });
		if (!userToFind) {
			return res
				.status(401)
				.send({ errors: [{ msg: "You are not authorized" }] });
		}
		req.user = userToFind;
		next();
	} catch (error) {
		res.status(401).send({ errors: [{ msg: "You are not authorized" }] });
	}
};

module.exports = isAuth;
