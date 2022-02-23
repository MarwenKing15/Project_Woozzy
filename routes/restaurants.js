const express = require("express");
const {
	addRestaurant,
	getAllRestaurants,
	getOneRestaurant,
	deleteOneRestaurant,
	updateRestaurant,
	PostRestaurantReview,
} = require("../controllers/restaurants");

const isAdmin = require("../Middlewares/isAdmin");
const isAuth = require("../Middlewares/isAuth");
const Upload = require("../Middlewares/Upload");

const Restaurant = require("../models/Restaurants");

const router = express.Router();

/**
 * @desc: add new Restaurant
 * @method: POST
 * @path :'http://localhost:5000/api/restaurant/admin/manageRestaurants'
 * @data : req.body
 */

router.post(
	"/admin/manageRestaurants/",
	Upload.single("Restaurant_Image"),
	isAuth,
	isAdmin,
	addRestaurant
);

/**
 * @desc: Get all Restaurants
 * @method: GET
 * @path :'http://localhost:5000/api/restaurant/restaurant'
 * @data : no data needed
 */

router.get("/restaurant", getAllRestaurants);

/**
 * @desc: Get one Restaurant
 * @method: GET
 * @path :'http://localhost:5000/api/restaurant/restaurant/:_id'
 * @data : req.params
 */

router.get("/restaurant/:_id", getOneRestaurant);

/**
 * @desc: Delete one Restaurant
 * @method: DELETE
 * @path :'http://localhost:5000/api/restaurant/admin/manageRestaurants/:_id'
 * @data : req.params
 */

router.delete(
	"/admin/manageRestaurants/:_id",
	isAuth,
	isAdmin,
	deleteOneRestaurant
);

/**
 * @desc: Update one Restaurant
 * @method: PUT
 * @path :'http://localhost:5000/api/restaurant/admin/manageRestaurants/:_id'
 * @data : req.params, req.body
 */

router.put(
	"/admin/manageRestaurants/:_id",
	Upload.single("image"),
	isAuth,
	isAdmin,
	updateRestaurant
);

/**
 * @desc: Post a Review
 * @method: POST
 * @path :'http://localhost:5000/api/restaurant/Review'
 * @data : req.body
 */

router.put("/Review/:_id", isAuth, PostRestaurantReview);

module.exports = router;
