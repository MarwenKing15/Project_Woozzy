const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema({
	name: {
		type: String,
		// required: true,
	},
	path: String,
	image: {
		data: Buffer,
		contentType: String,
	},
	hotel: { type: mongoose.Schema.Types.ObjectId, ref: "hotel" },
});
module.exports = Image = mongoose.model("image", imageSchema);
