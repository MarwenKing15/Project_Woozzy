const mongoose = require("mongoose");
const { Schema } = mongoose;

// const hotelReviewSchema = new Schema({
// 	User: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
// 	Review: String,
// 	Rating: {
// 		type: Number,
// 		default: 0,
// 	},
// 	addDate: {
// 		type: Date,
// 		default: Date.now(),
// 	},
// });

const hotelSchema = new Schema({
	Hotel_Name: {
		type: String,
		required: true,
	},
	Hotel_Description: {
		type: [String],
		required: true,
	},
	Hotel_Location: {
		Street: String,
		City: String,
		Country: String,
	},
	Hotel_Rating: {
		type: Number,
		required: true,
	},
	Hotel_PricePerNight: {
		type: Number,
		required: true,
	},
	Email: {
		type: String,
		required: true,
		unique: true,
	},
	Hotel_Website: String,
	phoneNumber: String,
	Hotel_About: String,
	Hotel_Image: String,
	Hotel_Reviews: [
		{
			id: Number,
			User: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
			Review: String,
			Rating: {
				type: Number,
				default: 0,
			},
			addDate: {
				type: Date,
				default: Date.now(),
			},
		},
	],
});
module.exports = Hotel = mongoose.model("hotel", hotelSchema);
