const express = require("express");
const {
	addHotel,
	deleteOneHotel,
	updateHotel,
} = require("../controllers/hotels");
const {
	addHostel,
	deleteOneHostel,
	updateHostel,
} = require("../controllers/hostels");

const isAdmin = require("../Middlewares/isAdmin");
const isAuth = require("../Middlewares/isAuth");
const Upload = require("../Middlewares/Upload");

const Hotel = require("../models/Hotels");
const Hostel = require("../models/Hostels");

const router = express.Router();

/**
 * @desc: add new Hotel
 * @method: POST
 * @path :'http://localhost:5000/api/hotel/admin/manageHotels'
 * @data : req.body
 */

router.post(
	"/manageHotels/",
	Upload.single("image"),
	isAuth,
	isAdmin,
	addHotel
);

/**
 * @desc: Delete one hotel
 * @method: DELETE
 * @path :'http://localhost:5000/api/hotel/admin/manageHotels/:_id'
 * @data : req.params
 */

router.delete("/manageHotels/:_id", isAuth, isAdmin, deleteOneHotel);

/**
 * @desc: Update one contact
 * @method: PUT
 * @path :'http://localhost:5000/api/hotel/admin/manageHotels/:_id'
 * @data : req.params, req.body
 */

router.put(
	"/manageHotels/:_id",
	Upload.single("image"),
	isAuth,
	isAdmin,
	updateHotel
);

/**
 * @desc: add new Hostel
 * @method: POST
 * @path :'http://localhost:5000/api/hostel/admin/manageHotels'
 * @data : req.body
 */

router.post(
	"/manageHostels/",
	Upload.single("image"),
	isAuth,
	isAdmin,
	addHostel
);

/**
 * @desc: Delete one hostel
 * @method: DELETE
 * @path :'http://localhost:5000/api/hotel/admin/manageHotels/:_id'
 * @data : req.params
 */

router.delete("/manageHostels/:_id", isAuth, isAdmin, deleteOneHostel);

/**
 * @desc: Update one Hostel
 * @method: PUT
 * @path :'http://localhost:5000/api/hotel/admin/manageHotels/:_id'
 * @data : req.params, req.body
 */

router.put(
	"/manageHostels/:_id",
	Upload.single("image"),
	isAuth,
	isAdmin,
	updateHostel
);

module.exports = router;
