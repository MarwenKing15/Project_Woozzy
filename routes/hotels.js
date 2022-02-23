const express = require("express");
const {
	addHotel,
	getAllHotels,
	getOneHotel,
	deleteOneHotel,
	updateHotel,
	PostHotelReview,
} = require("../controllers/hotels");
const isAdmin = require("../Middlewares/isAdmin");
const isAuth = require("../Middlewares/isAuth");
const Upload = require("../Middlewares/Upload");

const Hotel = require("../models/Hotels");

const router = express.Router();

/**
 * @desc: add new Hotel
 * @method: POST
 * @path :'http://localhost:5000/api/hotel/admin/manageHotels'
 * @data : req.body
 */

router.post(
	"/admin/manageHotels/",
	// Upload.single("Hotel_Image"),
	isAuth,
	isAdmin,
	addHotel
);

/**
 * @desc: Get all hotels
 * @method: GET
 * @path :'http://localhost:5000/api/hotel/hotel'
 * @data : no data needed
 */

router.get("/hotel", getAllHotels);

/**
 * @desc: Get one hotel
 * @method: GET
 * @path :'http://localhost:5000/api/hotel/hotel/:_id'
 * @data : req.params
 */

router.get("/hotelInfo/:_id", getOneHotel);

/**
 * @desc: Delete one hotel
 * @method: DELETE
 * @path :'http://localhost:5000/api/hotel/admin/manageHotels/:_id'
 * @data : req.params
 */

router.delete("/admin/manageHotels/:_id", isAuth, isAdmin, deleteOneHotel);

/**
 * @desc: Update one contact
 * @method: PUT
 * @path :'http://localhost:5000/api/hotel/admin/manageHotels/:_id'
 * @data : req.params, req.body
 */

router.put(
	"/admin/manageHotels/:_id",
	Upload.single("Hotel_Image"),
	isAuth,
	isAdmin,
	updateHotel
);

/**
 * @desc: Post a Review
 * @method: POST
 * @path :'http://localhost:5000/api/hotel/Review'
 * @data : req.body
 */

router.put("/Review/:_id", isAuth, PostHotelReview);

module.exports = router;
