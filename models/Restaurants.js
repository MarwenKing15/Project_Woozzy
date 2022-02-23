const mongoose = require("mongoose");
const { Schema } = mongoose;

const restaurantSchema = new Schema({
	Restaurant_Name: {
		type: String,
		required: true,
	},
	Restaurant_Description: {
		type: [String],
		required: true,
	},
	Restaurant_Cuisines: {
		type: [String],
		required: true,
	},
	Restaurant_Location: {
		Street: String,
		City: String,
		Country: String,
	},
	Restaurant_Rating: {
		type: Number,
		required: true,
	},
	Restaurant_Email: {
		type: String,
		required: true,
		unique: true,
	},
	Restaurant_Website: String,
	Restaurant_phoneNumber: String,
	Restaurant_Image: String,
	Restaurant_Reviews: [
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
module.exports = Restaurant = mongoose.model("restaurant", restaurantSchema);
