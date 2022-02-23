exports.addImage = async (req, res) => {
	try {
		console.log(req.file);
		const newImage = {
			name: req.file.originalname,
			path: req.file.path,
			image: {
				data: req.file.filename,
				contentType: "image/*",
			},
			// hotel ,
		};

		const imageToUpload = new Image(newImage);
		await imageToUpload.save();
		res.status(200).send({ msg: "Image Added Successfully" });
	} catch (error) {
		res.status(400).send({ errors: [{ msg: "Upload Failed" }], error });
	}
};
exports.addManyImages = async (req, res) => {
	try {
		console.log(req.file);
		const newImages = [
			{
				name: req.body.name,
				path: req.files.path,
				image: {
					data: req.files.filename,
					contentType: "image/*",
				},
			},
		];

		const imageToUpload = new Image(newImages);
		await imageToUpload.save();
		res.status(200).send({ msg: "Image Added Successfully" });
	} catch (error) {
		res.status(400).send({ errors: [{ msg: "Upload Failed" }], error });
	}
};

exports.getImage = async (req, res) => {
	try {
		const { _id } = req.params;
		const imageFound = await Image.findOne({ _id });
		res.status(200).send({ msg: " Found:", imageFound });
	} catch (error) {
		res.status(400).send({ errors: [{ msg: "Retrival Failed" }], error });
	}
};
exports.getAllImages = async (req, res) => {
	try {
		const listImages = await Image.find().populate("hotel");
		res
			.status(200)
			.send({ msg: "This is the list of all the images:", listImages });
	} catch (error) {
		res.status(400).send({ errors: [{ msg: "Retrival Failed" }], error });
	}
};
