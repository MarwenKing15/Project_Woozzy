import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Error from "../Pages/Error/Error";

const AdminRoute = ({ component: Component, ...rest }) => {
	const user = useSelector((state) => state.userReducer.user);

	const isAdmin = user.role;

	console.log({ isAdmin });

	if (user.role && isAdmin === "admin") {
		return <Route component={Component} {...rest} />;
	} else {
		return <Error />;
	}
};

export default AdminRoute;
