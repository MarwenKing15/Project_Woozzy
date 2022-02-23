const isAdmin = (req, res, next) => {
	console.log({ role: req.user.role });
	if (req.user.role === "admin") {
		next();
	} else {
		return res.status(403).send("You must be admin to pass !!!");
	}
};

module.exports = isAdmin;
