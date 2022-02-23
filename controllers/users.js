const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/Users");

exports.register = async (req, res) => {
	try {
		const {
			First_Name,
			Last_Name,
			Email,
			Password,
			Username,
			Gender,
			Address,
			role,
		} = req.body;

		const userFind = await User.findOne({ $or: [{ Email }, { Username }] });

		if (userFind) {
			return res.status(400).send({ errors: [{ msg: "User Already Exists" }] });
		}

		const user = new User({
			First_Name,
			Last_Name,
			Email,
			Password,
			Username,
			Gender,
			Address,
			role,
		});

		const salt = 10;
		const hashedPassword = await bcrypt.hash(Password, salt);
		user.Password = hashedPassword;
		await user.save();
		const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
			expiresIn: "72h",
		});

		res.status(200).send({ msg: "Registered User Successfully", user, token });
	} catch (error) {
		res.status(400).send({ errors: [{ msg: "Register Failed" }], error });
	}
};

exports.login = async (req, res) => {
	try {
		const { Email, Password } = req.body;

		const user = await User.findOne({ Email });
		if (!user) {
			return res.status(400).send({ errors: [{ msg: "Bad Credentials" }] });
		}

		const isMatch = await bcrypt.compare(Password, user.Password);
		if (!isMatch) {
			return res.status(400).send({ errors: [{ msg: "Bad Credentials" }] });
		}
		const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
			expiresIn: "72h",
		});
		res.status(200).send({ msg: "Logged In Successfully!!!", user, token });
	} catch (error) {
		res.status(400).send({ errors: [{ msg: "Login Failed" }] });
	}
};

exports.getProfile = (req, res) => {
	res.send(req.user);
};

exports.getAllUsers = async (req, res) => {
	try {
		const listUser = await User.find();
		res
			.status(200)
			.send({ msg: "This is the list of all the users:", listUser });
	} catch (error) {
		res.status(400).send({ errors: [{ msg: "Getting List of Users Failed" }] });
	}
};

exports.UpdateProfile = async (req, res) => {
	try {
		const { _id } = req.user;
		console.log(req.file);
		const editedProfile = {
			First_Name: req.body.First_Name,
			Last_Name: req.body.Last_Name,
			Email: req.body.Email,
			Password: req.body.Password,
			Username: req.body.Username,
			Gender: req.body.Gender,
			// Address: {
			// 	Street: req.body.Street,
			// 	City: req.body.City,
			// 	Country: req.body.Country,
			// 	ZipCode: req.body.ZipCode,
			// },
			ProfileImage: req.file.path,
		};

		// const salt = 10;
		// const hashedPassword = await bcrypt.hash(Password, salt);
		// editedProfile.Password = hashedPassword;

		let results = await User.updateOne(
			{ _id },
			{
				$set: {
					First_Name: editedProfile.First_Name,
					Last_Name: editedProfile.Last_Name,
					Email: editedProfile.Email,
					Password: editedProfile.Password,
					Username: editedProfile.Username,
					Gender: editedProfile.Gender,
					// ProfileImage: editedProfile.ProfileImage,
					// Address: {
					// 	...req.user.Address,
					// 	// ...editedProfile.Address
					// },
				},
			}
		);

		if (results.modifiedCount === 0) {
			return res.status(400).send({ msg: "User Already Updated" });
		}
		res.status(200).send({ msg: "User Updated Succesfully" });
	} catch (error) {
		res.status(400).send({ errors: [{ msg: "Updating User Failed" }], error });
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const userID = req.params.id;
		await User.deleteOne({ _id: userID });
		res.status(200).send({ msg: "User Deleted Succesfully" });
	} catch (error) {
		res.status(400).send({ errors: [{ msg: "Failed To Delete The User" }] });
	}
};

exports.getOneUser = async (req, res) => {
	try {
		const userID = req.params.id;
		const userFound = await User.find({ _id: userID });
		res.status(200).send({ msg: "User Found:", userFound });
	} catch (error) {
		res.status(400).send({ errors: [{ msg: "Retrival Failed" }], error });
	}
};

exports.UpgradeUser = async (req, res) => {
	try {
		const userID = req.params.id;

		let results = await User.findOneAndUpdate(
			{ _id: userID },
			{
				$set: {
					role: "Ambassador",
				},
			},
			{ new: true }
		);
		console.log(results);

		if (results.modifiedCount === 0) {
			return res.status(400).send({ msg: "User Already Upgraded" });
		}
		res.status(200).send({ msg: "User Upgraded Succesfully", results });
	} catch (error) {
		res.status(400).send({ errors: [{ msg: "Upgrading User Failed" }], error });
	}
};
