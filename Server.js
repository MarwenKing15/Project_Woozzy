const express = require("express");
const path = require("path");

app = express();

require("dotenv").config();

const connectDB = require("./config/ConnectDB");
const userRouter = require("./routes/users");
const hotelRouter = require("./routes/hotels");
const hostelRouter = require("./routes/hostels");
const restaurantRouter = require("./routes/restaurants");

connectDB();

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/hotel", hotelRouter);
app.use("/api/hostel", hostelRouter);
app.use("/api/restaurant", restaurantRouter);

// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static("client/build"));
// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// 	});
// }

const port = process.env.PORT || 5000;

app.listen(port, (error) =>
	error
		? console.log(`Can not run the server!!!`)
		: console.log(`Server is running on port ${port}`)
);

console.clear();
