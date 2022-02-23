import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { currentUserProfile } from "./JS/actions/user";
import NavBar from "./Components/NavBar/NavBar";
import LandingPage from "./Pages/LandingPage/LandingPage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import LogInPage from "./Pages/LogInPage/LogInPage";
import Profile from "./Pages/ProfilePage/Profile";
import HotelList from "./Pages/Hotel/HotelList/HotelList";
import RestaurantList from "./Pages/Restaurant/RestaurantList/RestaurantList";
import HotelPage from "./Pages/Hotel/HotelPage/HotelPage";
import Admin from "./Pages/Admin/Admin";
import PrivateRoute from "./router/PrivateRoute";
import HostelList from "./Pages/Hostel/HostelList/HostelList";
import ContactPage from "./Pages/ContactPage/ContactPage";
import Error from "./Pages/Error/Error";
import AdminRoute from "./router/AdminRoute";
import MangeUsersList from "./Pages/Users/MangeUsersList";
import ManageHotels from "./Pages/Hotel/ManageHotels/ManageHotels";
import AddEditHotelPage from "./Pages/Hotel/AddEditHotelPage/AddEditHotelPage";
import ManageHostels from "./Pages/Hostel/ManageHostels/ManageHostels";
import ManageRestaurants from "./Pages/Restaurant/ManageRestaurants/ManageRestaurants";
import AddEditHostelPage from "./Pages/Hostel/AddEditHostelPage/AddEditHostelPage";
import AddEditRestaurantPage from "./Pages/Restaurant/AddEditRestaurantPage/AddEditRestaurantPage";
import HostelPage from "./Pages/Hostel/HostelPage/HostelPage";
import RestaurantPage from "./Pages/Restaurant/RestaurantPage/RestaurantPage";
import Footer from "./Components/Footer/Footer";
import "./App.css";

function App() {
	const token = localStorage.getItem("token");

	const dispatch = useDispatch();

	useEffect(() => {
		token && dispatch(currentUserProfile());
	}, [dispatch, token]);

	return (
		<div className="App">
			<NavBar />
			<Switch>
				<Route exact path="/" component={LandingPage} />
				<Route path="/register" component={SignUpPage} />
				<Route path="/LogIn" component={LogInPage} />
				<Route path="/hotel" component={HotelList} />
				<Route path="/hostel" component={HostelList} />
				<Route path="/restaurant" component={RestaurantList} />
				<Route path="/contact" component={ContactPage} />
				<PrivateRoute path="/Profile" component={Profile} />
				<PrivateRoute path="/hotelInfo/:_id" component={HotelPage} />
				<PrivateRoute path="/hostelInfo/:_id" component={HostelPage} />
				<PrivateRoute path="/restaurantInfo/:_id" component={RestaurantPage} />
				<AdminRoute path="/admin" component={Admin} />
				<Route path="/manageUsers" component={MangeUsersList} />
				<AdminRoute path="/manageHotels" component={ManageHotels} />
				<AdminRoute
					path={["/addHotel", "/editHotel/:_id"]}
					component={AddEditHotelPage}
				/>
				<AdminRoute path="/manageHostels" component={ManageHostels} />
				<AdminRoute
					path={["/addHostel", "/editHostel/:_id"]}
					component={AddEditHostelPage}
				/>
				<AdminRoute path="/manageRestaurants" component={ManageRestaurants} />
				<AdminRoute
					path={["/addRestaurant", "/editRestaurant/:_id"]}
					component={AddEditRestaurantPage}
				/>
				<Route path="/*" component={Error} />
			</Switch>
			<br />
			<Footer />
		</div>
	);
}
export default App;
