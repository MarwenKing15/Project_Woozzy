import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ManageUsers from "../../Components/ManageUsers/ManageUsers";
import { getUsers } from "../../JS/actions/user";
import LoadingPage from "../LoadingPage/LoadingPage";
import "./MangeUsersList.css";

const MangeUsersList = () => {
	const listUser = useSelector((state) => state.userReducer.listUser);

	const load = useSelector((state) => state.userReducer.load);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	return load ? (
		<LoadingPage />
	) : (
		<div className="contactContainer">
			{listUser &&
				listUser.map((user) => <ManageUsers user={user} key={user._id} />)}
		</div>
	);
};

export default MangeUsersList;
