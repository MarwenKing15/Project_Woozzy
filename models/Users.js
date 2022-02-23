const mongoose = require("mongoose");
const { Schema } = mongoose;

// const addressSchema = new mongoose.Schema({
// 	Street: String,
// 	City: String,
// 	Country: String,
// 	ZipCode: Number,
// });

// var imageSchema = new mongoose.Schema({
// 	name: String,
// 	desc: String,
// 	img: {
// 		data: Buffer,
// 		contentType: String,
// 	},
// });

const userSchema = new Schema({
	First_Name: {
		type: String,
		required: true,
	},
	Last_Name: {
		type: String,
		required: true,
	},
	Email: {
		type: String,
		required: true,
		unique: true,
	},
	Password: {
		type: String,
		required: true,
	},
	Username: {
		type: String,
		required: true,
		unique: true,
	},
	Gender: String,
	Address: {
		Street: String,
		City: String,
		Country: String,
		ZipCode: Number,
	},
	ProfileImage: String,
	role: { type: String, default: "user" },
});
module.exports = User = mongoose.model("user", userSchema);
