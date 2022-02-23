const express = require("express");

const multer = require("multer");
const {
	addImage,
	getImage,
	addManyImages,
	getAllImages,
} = require("../controllers/images");
const isAuth = require("../Middlewares/isAuth");
const Upload = require("../Middlewares/Upload");
const Image = require("../models/Images");

const router = express.Router();

router.post("/", Upload.single("image"), isAuth, addImage);
router.post("/Many", Upload.array("uploadedImages", 10), isAuth, addManyImages);

router.get("/:_id", getImage);
router.get("/", getAllImages);

module.exports = router;
