const express = require("express");
const {
	addHostel,
	getAllHostels,
	getOneHostel,
	deleteOneHostel,
	updateHostel,
	PostHostelReview,
} = require("../controllers/hostels");

const isAdmin = require("../Middlewares/isAdmin");
const isAuth = require("../Middlewares/isAuth");
const Upload = require("../Middlewares/Upload");

const Hostel = require("../models/Hostels");

const router = express.Router();

/**
 * @desc: add new Hostel
 * @method: POST
 * @path :'http://localhost:5000/api/hostel/admin/manageHotels'
 * @data : req.body
 */

router.post(
	"/admin/manageHostels/",
	Upload.single("Hostel_Image"),
	isAuth,
	isAdmin,
	addHostel
);

/**
 * @desc: Get all hostels
 * @method: GET
 * @path :'http://localhost:5000/api/hotel/hotel'
 * @data : no data needed
 */

router.get("/hostel", getAllHostels);

/**
 * @desc: Get one hostel
 * @method: GET
 * @path :'http://localhost:5000/api/hotel/hotel/:_id'
 * @data : req.params
 */

router.get("/hostelInfo/:_id", getOneHostel);

/**
 * @desc: Delete one hostel
 * @method: DELETE
 * @path :'http://localhost:5000/api/hotel/admin/manageHotels/:_id'
 * @data : req.params
 */

router.delete("/admin/manageHostels/:_id", isAuth, isAdmin, deleteOneHostel);

/**
 * @desc: Update one Hostel
 * @method: PUT
 * @path :'http://localhost:5000/api/hotel/admin/manageHotels/:_id'
 * @data : req.params, req.body
 */

router.put(
	"/admin/manageHostels/:_id",
	Upload.single("image"),
	isAuth,
	isAdmin,
	updateHostel
);

/**
 * @desc: Post a Review
 * @method: POST
 * @path :'http://localhost:5000/api/hostel/Review'
 * @data : req.body
 */

router.put("/Review/:_id", isAuth, PostHostelReview);

module.exports = router;
