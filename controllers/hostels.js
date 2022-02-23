exports.addHostel = async (req, res) => {
	try {
		// console.log(req);

		// const newHotel = req.body;
		const newHostel = {
			Hostel_Name: req.body.Hostel_Name,
			Hostel_Description: req.body.Hostel_Description,
			HostelRoom_Description: req.body.HostelRoom_Description,
			Hostel_Location: {
				Street: req.body.Street,
				City: req.body.City,
				Country: req.body.Country,
			},
			Hostel_Rating: req.body.Hostel_Rating,
			Hostel_PricePerNight: req.body.Hostel_PricePerNight,
			Hostel_Email: req.body.Hostel_Email,
			Hostel_Website: req.body.Hostel_Website,
			Hostel_phoneNumber: req.body.Hostel_phoneNumber,
			Hostel_About: req.body.Hostel_About,
			// Hostel_Image: req.file.path,
		};
		console.log(req.body);
		console.log(req.file.path);

		if (
			!newHostel.Hostel_Name ||
			!newHostel.Hostel_Description ||
			!newHostel.Hostel_Rating ||
			!newHostel.Hostel_PricePerNight
		) {
			return res.status(400).send({
				msg: "Hostel name, description, rating and price per night  are required",
			});
		}

		const HostelToFind = await Hostel.findOne({
			Hostel_Email: newHostel.Hostel_Email,
		});
		if (HostelToFind) {
			return res.status(400).send({ msg: "Hostel already exists" });
		}

		const HostelToAdd = new Hostel(newHostel);
		await HostelToAdd.save();

		res.status(200).send({ msg: "Hostel Added Successfully", HostelToAdd });
	} catch (error) {
		res
			.status(400)
			.send({ errors: [{ msg: "Register Failed", error }], error });
	}
};

exports.getAllHostels = async (req, res) => {
	try {
		const listHostels = await Hostel.find();
		res
			.status(200)
			.send({ msg: "This is the list of all hostels:", listHostels });
	} catch (error) {
		res.status(400).send({ errors: [{ msg: "Retrival Failed" }], error });
	}
};

exports.getOneHostel = async (req, res) => {
	try {
		const { _id } = req.params;
		const hostelFound = await Hostel.findOne({ _id });
		res.status(200).send({ msg: "Hostel Found:", hostelFound });
	} catch (error) {
		res.status(400).send({ errors: [{ msg: "Retrival Failed" }], error });
	}
};

exports.deleteOneHostel = async (req, res) => {
	try {
		const { _id } = req.params;
		await Hostel.deleteOne({ _id });
		res.status(200).send({ msg: "Hotel Deleted Succesfully" });
	} catch (error) {
		res.status(400).send({ errors: [{ msg: "Deletion Failed" }], error });
	}
};

exports.updateHostel = async (req, res) => {
	try {
		const { _id } = req.params;
		const hostelFound = await Hostel.findOne({ _id });
		const updateHostel = {
			Hostel_Name: req.body.Hostel_Name,
			Hostel_Description: req.body.Hostel_Description,
			HostelRoom_Description: req.body.HostelRoom_Description,
			Hostel_Location: {
				Street: req.body.Street,
				City: req.body.City,
				Country: req.body.Country,
			},
			Hostel_Rating: req.body.Hostel_Rating,
			Hostel_PricePerNight: req.body.Hostel_PricePerNight,
			Hostel_Email: req.body.Hostel_Email,
			Hostel_Website: req.body.Hostel_Website,
			Hostel_phoneNumber: req.body.Hostel_phoneNumber,
			Hostel_About: req.body.Hostel_About,
			Hostel_Image: req.file.path,
		};
		let results = await Hostel.updateOne(
			{ _id },
			{
				$set: {
					Hostel_Name: updateHostel.Hostel_Name,
					Hostel_Description: updateHostel.Hostel_Description,
					Hostel_Rating: updateHostel.Hostel_Rating,
					Hostel_PricePerNight: updateHostel.Hostel_PricePerNight,
					Hostel_Email: updateHostel.Hostel_Email,
					Hostel_phoneNumber: updateHostel.Hostel_phoneNumber,
					Hostel_Location: {
						...hotelFound.Hostel_Location,
						// ...updateHostel.Hotel_Location,
					},
					Hostel_About: updateHostel.Hostel_About,
					HostelRoom_Description: updateHostel.HostelRoom_Description,
					Hostel_Image: updateHostel.Hostel_Image,
				},
			}
		);
		if (results.modifiedCount === 0) {
			return res.status(400).send({ msg: "Hotel Information Already Updated" });
		}
		res.status(200).send({ msg: "Hotel Updated Succesfully" });
	} catch (error) {
		res.status(400).send({ errors: [{ msg: "Can not update this Hotel" }] });
	}
};

exports.updateHostel = async (req, res) => {
	try {
		const { _id } = req.params;
		const hostelFound = await Hostel.findOne({ _id });
		const reviewHostel = req.body.Hostel_Reviews;
		await Hostel.updateOne(
			{ _id },
			{
				$set: { ...hostelFound, reviewHostel },
			}
		);
		res.status(200).send({ msg: "Review Posted Succesfully" });
	} catch (error) {
		res.status(400).send({ errors: [{ msg: "Can not post the review" }] });
	}
};

exports.PostHostelReview = async (req, res) => {
	try {
		const { _id } = req.params;
		const reviewHostel = req.body;
		await Hostel.updateOne(
			{ _id },
			{
				$push: {
					Hostel_Reviews: {
						Review: reviewHostel.Review,
						Rating: reviewHostel.Rating,
						User: req.user,
					},
				},
			}
		);
		res.status(200).send({ msg: "Review Posted Succesfully" });
	} catch (error) {
		res
			.status(400)
			.send({ errors: [{ msg: "Can not post the review", error }] });
	}
};
