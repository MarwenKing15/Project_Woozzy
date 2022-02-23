import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ManageHotelCard from "../../../Components/Hotel/ManageHotelCard/ManageHotelCard";
import LoadingPage from "../../LoadingPage/LoadingPage";

import { getHotels, toogleFalse } from "../../../JS/actions/hotel";

const ManageHotels = () => {
	const listHotels = useSelector((state) => state.hotelReducer.listHotels);

	const load = useSelector((state) => state.hotelReducer.load);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getHotels());
	}, [dispatch]);

	return load ? (
		<LoadingPage />
	) : (
		<div>
			<br />
			<div className="AddBtn">
				<Link to="/addHotel">
					<Button onClick={() => dispatch(toogleFalse())}>Add Hotel</Button>
				</Link>
			</div>
			<br />
			<div className="contactContainer">
				{listHotels.map((hotel) => (
					<ManageHotelCard hotel={hotel} key={hotel._id} />
				))}
			</div>
		</div>
	);
};

export default ManageHotels;
