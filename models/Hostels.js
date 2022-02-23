const mongoose = require("mongoose");
const { Schema } = mongoose;

const hostelSchema = new Schema({
	Hostel_Name: {
		type: String,
		required: true,
	},
	Hostel_Description: {
		type: [String],
		required: true,
	},
	Hostel_Location: {
		Street: String,
		City: String,
		Country: String,
	},
	Hostel_Rating: {
		type: Number,
		required: true,
	},
	Hostel_PricePerNight: {
		type: Number,
		required: true,
	},
	HostelRoom_Description: {
		type: [String],
		required: true,
	},
	Hostel_Email: {
		type: String,
		required: true,
		unique: true,
	},
	Hostel_Website: String,
	Hostel_phoneNumber: String,
	Hostel_About: String,
	Hostel_Image: String,
	Hostel_Reviews: [
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
module.exports = Hostel = mongoose.model("hostel", hostelSchema);
