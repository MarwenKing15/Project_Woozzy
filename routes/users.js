const express = require("express");
const {
	register,
	login,
	getProfile,
	getAllUsers,
	UpdateProfile,
	deleteUser,
	getOneUser,
	UpgradeUser,
} = require("../controllers/users");
const isAdmin = require("../Middlewares/isAdmin");
const isAuth = require("../Middlewares/isAuth");
const Upload = require("../Middlewares/Upload");

const {
	registerValidator,
	validations,
	loginValidator,
} = require("../Middlewares/userValidator");

const router = express.Router();

/**
 * @desc: Register
 * @method: POST
 * @path :'http://localhost:5000/api/user/register'
 * @data : req.body
 */

router.post("/register", registerValidator(), validations, register);

/**
 * @desc: Login
 * @method: POST
 * @path :'http://localhost:5000/api/user/login'
 * @data : req.body
 */

router.post("/login", loginValidator(), validations, login);

/**
 * @desc: Profile
 * @method: GET
 * @path :'http://localhost:5000/api/user/Profile'
 * @data : req.params
 */

router.get("/Profile", isAuth, getProfile);

/**
 * @desc: Get One User
 * @method: GET
 * @path :'http://localhost:5000/api/user/Profile'
 * @data : req.params
 */

router.get("/OneUser/:id", getOneUser);

/**
 * @desc: Get all contacts
 * @method: GET
 * @path :'http://localhost:5000/api/user/ListOfUsers'
 * @data : no data needed
 */

router.get("/ListOfUsers", getAllUsers);

/**
 * @desc: Update User Profile
 * @method: PUT
 * @path :'http://localhost:5000/api/user/UpdateProfile'
 * @data : req.params, req.body
 */

router.put("/Profile", Upload.single("ProfileImage"), isAuth, UpdateProfile);

/**
 * @desc: Upgrade User
 * @method: PUT
 * @path :'http://localhost:5000/api/user/admin/manageUsers'
 * @data : req.params
 */

router.put("/admin/manageUsers/:id", isAuth, isAdmin, UpgradeUser);

/**
 * @desc: Delete One User
 * @method: DELETE
 * @path :'http://localhost:5000/api/user/:id'
 * @data : req.params
 */

router.delete("/:id", deleteUser);

module.exports = router;
