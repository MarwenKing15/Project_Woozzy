import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHostels, toogleFalse } from "../../../JS/actions/hostel";
import ManageHostelCard from "../../../Components/Hostel/ManageHostelCard/ManageHostelCard";
import LoadingPage from "../../LoadingPage/LoadingPage";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ManageHostels = () => {
	const listHostels = useSelector((state) => state.hostelReducer.listHostels);

	const load = useSelector((state) => state.hotelReducer.load);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getHostels());
	}, [dispatch]);

	return load ? (
		<LoadingPage />
	) : (
		<div>
			<br />
			<div className="AddBtn">
				<Link to="/addHostel">
					<Button onClick={() => dispatch(toogleFalse())}>Add Hostel</Button>
				</Link>
			</div>
			<br />
			<div className="contactContainer">
				{listHostels.map((hostel) => (
					<ManageHostelCard hostel={hostel} key={hostel._id} />
				))}
			</div>
		</div>
	);
};

export default ManageHostels;
