exports.addRestaurant = async (req, res) => {
	try {
		// console.log(req);

		// const newHotel = req.body;
		// console.log(req.body);
		console.log(req.file);
		const newRestaurant = {
			Restaurant_Name: req.body.Restaurant_Name,
			Restaurant_Description: req.body.Restaurant_Description,
			Restaurant_Cuisines: req.body.Restaurant_Cuisines,
			Restaurant_Location: {
				Street: req.body.Street,
				City: req.body.City,
				Country: req.body.Country,
			},
			Restaurant_Rating: req.body.Restaurant_Rating,
			Restaurant_Email: req.body.Restaurant_Email,
			Restaurant_Website: req.body.Restaurant_Website,
			Restaurant_phoneNumber: req.body.Restaurant_phoneNumber,
			Restaurant_Image: req.file.path,
		};

		if (
			!newRestaurant.Restaurant_Name ||
			!newRestaurant.Restaurant_Description ||
			!newRestaurant.Restaurant_Rating
		) {
			return res.status(400).send({
				msg: "Restaurant name, description and rating  are required",
			});
		}

		const RestaurantToFind = await Restaurant.findOne({
			Restaurant_Email: newRestaurant.Restaurant_Email,
		});
		if (RestaurantToFind) {
			return res.status(400).send({ msg: "Restaurant already exists" });
		}

		const RestaurantToAdd = new Restaurant(newRestaurant);
		await RestaurantToAdd.save();

		res
			.status(200)
			.send({ msg: "Restaurant Added Successfully", RestaurantToAdd });
	} catch (error) {
		res.status(400).send({ errors: [{ msg: "Register Failed" }], error });
	}
};

exports.getAllRestaurants = async (req, res) => {
	try {
		const listRestaurants = await Restaurant.find();
		res.status(200).send({
			msg: "This is the list of all Restaurants:",
			listRestaurants,
		});
	} catch (error) {
		res.status(400).send({ errors: [{ msg: "Retrival Failed" }], error });
	}
};

exports.getOneRestaurant = async (req, res) => {
	try {
		const { _id } = req.params;
		const restaurantFound = await Restaurant.findOne({ _id });
		res.status(200).send({ msg: "Restaurant Found:", restaurantFound });
	} catch (error) {
		res.status(400).send({ errors: [{ msg: "Retrival Failed" }], error });
	}
};

exports.deleteOneRestaurant = async (req, res) => {
	try {
		const { _id } = req.params;
		await Restaurant.deleteOne({ _id });
		res.status(200).send({ msg: "Restaurant Deleted Succesfully" });
	} catch (error) {
		res.status(400).send({ errors: [{ msg: "Deletion Failed" }], error });
	}
};

exports.updateRestaurant = async (req, res) => {
	try {
		const { _id } = req.params;
		// const RestaurantFound = await Restaurant.findOne({ _id });
		const updateRestaurant = {
			Restaurant_Name: req.body.Restaurant_Name,
			Restaurant_Description: req.body.Restaurant_Description,
			Restaurant_Cuisines: req.body.Restaurant_Cuisines,
			Restaurant_Location: {
				Street: req.body.Street,
				City: req.body.City,
				Country: req.body.Country,
			},
			Restaurant_Rating: req.body.Restaurant_Rating,
			Restaurant_Email: req.body.Restaurant_Email,
			Restaurant_Website: req.body.Restaurant_Website,
			Restaurant_phoneNumber: req.body.Restaurant_phoneNumber,
			Restaurant_Image: req.file.path,
		};
		let results = await Restaurant.updateOne(
			{ _id },
			{
				$set: {
					Restaurant_Name: updateRestaurant.Restaurant_Name,
					Restaurant_Description: updateRestaurant.Restaurant_Description,
					Restaurant_Rating: updateRestaurant.Restaurant_Rating,
					Restaurant_Email: updateRestaurant.Email,
					Restaurant_phoneNumber: updateRestaurant.Restaurant_phoneNumber,
					Restaurant_Location: {
						// ...restaurantFound.Restaurant_Location,
						...updateRestaurant.Restaurant_Location,
					},
					Restaurant_Website: updateRestaurant.Restaurant_Website,
					Restaurant_About: updateRestaurant.Restaurant_About,
					Restaurant_Image: updateRestaurant.Restaurant_Image,
				},
			}
		);
		if (results.modifiedCount === 0) {
			return res
				.status(400)
				.send({ msg: "Restaurant Information Already Updated" });
		}
		res.status(200).send({ msg: "Restaurant Updated Succesfully" });
	} catch (error) {
		res
			.status(400)
			.send({ errors: [{ msg: "Can not update this Restaurant" }] });
	}
};

exports.PostRestaurantReview = async (req, res) => {
	try {
		const { _id } = req.params;
		const reviewRestaurant = req.body;
		await Restaurant.updateOne(
			{ _id },
			{
				$push: {
					Restaurant_Reviews: {
						Review: reviewRestaurant.Review,
						Rating: reviewRestaurant.Rating,
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
