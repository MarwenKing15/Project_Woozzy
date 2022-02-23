exports.addHotel = async (req, res) => {
	try {
		// console.log(req);

		// const newHotel = req.body;
		console.log(req.body);
		console.log(req.file);
		// const newHotel = req.body;
		const newHotel = {
			Hotel_Name: req.body.Hotel_Name,
			Hotel_Description: req.body.Hotel_Description,
			Hotel_Location: req.body.Hotel_Location,
			Hotel_Rating: req.body.Hotel_Rating,
			Hotel_PricePerNight: req.body.Hotel_PricePerNight,
			Email: req.body.Email,
			Hotel_Website: req.body.Hotel_Website,
			phoneNumber: req.body.phoneNumber,
			Hotel_About: req.body.Hotel_About,
			Hotel_Image: req.file.path,
		};

		if (
			!newHotel.Hotel_Name ||
			!newHotel.Hotel_Description ||
			!newHotel.Hotel_Rating ||
			!newHotel.Hotel_PricePerNight
		) {
			return res.status(400).send({
				msg: "Hotel name, description, rating and price per night  are required",
			});
		}

		const HotelToFind = await Hotel.findOne({ Email: newHotel.Email });
		if (HotelToFind) {
			return res.status(400).send({ msg: "Hotel already exists" });
		}

		const HotelToAdd = new Hotel(newHotel);
		await HotelToAdd.save();

		res.status(200).send({ msg: "Hotel Added Successfully", HotelToAdd });
	} catch (error) {
		res.status(400).send({ errors: [{ msg: "Register Failed" }], error });
	}
};

exports.getAllHotels = async (req, res) => {
	try {
		const listHotels = await Hotel.find();
		res
			.status(200)
			.send({ msg: "This is the list of all hotels:", listHotels });
	} catch (error) {
		res.status(400).send({ errors: [{ msg: "Retrival Failed" }], error });
	}
};

exports.getOneHotel = async (req, res) => {
	try {
		const { _id } = req.params;
		const hotelFound = await Hotel.findOne({ _id });
		res.status(200).send({ msg: "Hotel Found:", hotelFound });
	} catch (error) {
		res.status(400).send({ errors: [{ msg: "Retrival Failed" }], error });
	}
};

exports.deleteOneHotel = async (req, res) => {
	try {
		const { _id } = req.params;
		await Hotel.deleteOne({ _id });
		res.status(200).send({ msg: "Hotel Deleted Succesfully" });
	} catch (error) {
		res.status(400).send({ errors: [{ msg: "Deletion Failed" }], error });
	}
};

exports.updateHotel = async (req, res) => {
	try {
		const { _id } = req.params;
		// const hotelFound = await Hotel.findOne({ _id });
		const updateHotel = {
			Hotel_Name: req.body.Hotel_Name,
			Hotel_Description: req.body.Hotel_Description,
			Hotel_Location: {
				Street: req.body.Street,
				City: req.body.City,
				Country: req.body.Country,
			},
			Hotel_Rating: req.body.Hotel_Rating,
			Hotel_PricePerNight: req.body.Hotel_PricePerNight,
			Email: req.body.Email,
			Hotel_Website: req.body.Hotel_Website,
			phoneNumber: req.body.phoneNumber,
			Hotel_About: req.body.Hotel_About,
			// Hotel_Image: req.file.path,
		};
		let results = await Hotel.updateOne(
			{ _id },
			{
				$set: {
					Hotel_Name: updateHotel.Hotel_Name,
					Hotel_Description: updateHotel.Hotel_Description,
					Hotel_Rating: updateHotel.Hotel_Rating,
					Hotel_PricePerNight: updateHotel.Hotel_PricePerNight,
					Email: updateHotel.Email,
					phoneNumber: updateHotel.phoneNumber,
					Hotel_Location: {
						// ...hotelFound.Hotel_Location,
						...updateHotel.Hotel_Location,
					},
					Hotel_About: updateHotel.Hotel_About,
					// Hotel_Image: updateHotel.Hotel_Image,
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

exports.PostHotelReview = async (req, res) => {
	try {
		const { _id } = req.params;
		const reviewHotel = req.body;
		await Hotel.updateOne(
			{ _id },
			{
				$push: {
					Hotel_Reviews: {
						Review: reviewHotel.Review,
						Rating: reviewHotel.Rating,
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
