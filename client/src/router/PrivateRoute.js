import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const token = localStorage.getItem("token");

	if (!token) {
		return <Redirect to="/LogIn" />;
	}

	return <Route component={Component} {...rest} />;
};

export default PrivateRoute;
