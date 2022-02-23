import React, { useState, useEffect } from "react";

import { Navbar, Nav, NavbarBrand, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import { logout, toogleTrue } from "../../JS/actions/user";
import { logout } from "../../JS/actions/user";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

import LogoNav from "../../assets/Woozzy_Logo.png";
import avatarLogo from "../../assets/403017_avatar_default_head_person_unknown_icon.png";

import "./NavBar.css";

const NavBar = () => {
	const isAuth = useSelector((state) => state.userReducer.isAuth);
	const user = useSelector((state) => state.userReducer.user);
	const dispatch = useDispatch();
	const [profilePic, setProfilePic] = useState("");

	useEffect(() => {
		if (!user.ProfileImage) {
			setProfilePic(avatarLogo);
		} else {
			setProfilePic(`../../../../${user.ProfileImage}`);
		}
	}, [user.ProfileImage]);

	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const SERVICE_ID = process.env.SERVICE_ID || "service_kudcfxk";
	const TEMPLATE_ID = "template_ncr4z47";
	const USER_ID = process.env.USER_ID || "user_WOwvxU3YnxPMK9vh9Fa2d";

	const handleOnSubmit = (e) => {
		emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, user, USER_ID).then(
			(result) => {
				console.log(result.text);
				Swal.fire({
					icon: "success",
					title: "Message Sent Successfully",
				});
			},
			(error) => {
				console.log(error.text);
				Swal.fire({
					icon: "error",
					title: "Ooops, something went wrong",
					text: error.text,
				});
			}
		);
	};

	if (user.role === "admin") {
		return (
			<div>
				<Navbar expand="lg" bg="light" variant="light">
					<NavbarBrand>
						<img className="NavLogo" src={LogoNav} alt="NAV LOGO" />
					</NavbarBrand>
					<Nav className="me-auto">
						<NavLink
							exact
							to="/"
							style={{ textDecoration: "none", color: "grey", margin: "2px" }}
							className="navlink"
							activeClassName="selectedLink"
						>
							{/* <Nav.Link href="/">Home</Nav.Link> */}
							Home
						</NavLink>
						<NavLink
							to="/hotel"
							style={{ textDecoration: "none", color: "grey", margin: "2px" }}
							className="navlink"
							activeClassName="selectedLink"
						>
							{/* <Nav.Link href="hotel">Hotels</Nav.Link> */}
							Hotels
						</NavLink>
						<NavLink
							to="/hostel"
							style={{ textDecoration: "none", color: "grey", margin: "2px" }}
							className="navlink"
							activeClassName="selectedLink"
						>
							{/* <Nav.Link href="hostel">Hostels</Nav.Link> */}
							Hostels
						</NavLink>

						<NavLink
							to="/restaurant"
							style={{ textDecoration: "none", color: "grey", margin: "2px" }}
							className="navlink"
							activeClassName="selectedLink"
						>
							{/* <Nav.Link href="restaurant">Restaurants</Nav.Link> */}
							Restaurants
						</NavLink>

						<NavLink
							to="/contact"
							style={{ textDecoration: "none", color: "grey", margin: "2px" }}
							className="navlink"
							activeClassName="selectedLink"
						>
							{/* <Nav.Link href="Contact">Contact</Nav.Link> */}
							Contact
						</NavLink>
					</Nav>
					<button className="btn_amb" onClick={handleOnSubmit}>
						Become A Woozzy Ambassador
					</button>{" "}
					<div className="cnxBtns">
						{isAuth ? (
							<>
								<Box sx={{ flexGrow: 0 }}>
									<Tooltip title="Open settings">
										<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
											<Avatar
												alt="User Profile Pic"
												src={profilePic}
												sx={{ width: 56, height: 56 }}
											/>
										</IconButton>
									</Tooltip>
									<Menu
										sx={{ mt: "45px" }}
										id="menu-appbar"
										anchorEl={anchorElUser}
										anchorOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										keepMounted
										transformOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										open={Boolean(anchorElUser)}
										onClose={handleCloseUserMenu}
									>
										<Link to="/admin" style={{ textDecoration: "none" }}>
											<MenuItem
												onClick={() => {
													handleCloseUserMenu();
												}}
											>
												Admin Interface
											</MenuItem>
										</Link>
										<Link to="/Profile" style={{ textDecoration: "none" }}>
											<MenuItem
												onClick={() => {
													handleCloseUserMenu();
												}}
											>
												<Typography textAlign="center">Profile</Typography>
											</MenuItem>
										</Link>
										<Link to="/LogIn" style={{ textDecoration: "none" }}>
											<MenuItem
												onClick={() => {
													dispatch(logout());
													handleCloseUserMenu();
												}}
											>
												<Typography textAlign="center">
													<FontAwesomeIcon icon={faSignOutAlt} />
													Log Out
												</Typography>
											</MenuItem>
										</Link>
									</Menu>
								</Box>
							</>
						) : (
							<div className="NavBtn">
								<Link to="/LogIn" style={{ textDecoration: "none" }}>
									<Button variant="outline-dark" className="logInBtn">
										Log In
									</Button>{" "}
								</Link>
								<Link to="/register" style={{ textDecoration: "none" }}>
									<Button variant="success" className="signUpBtn">
										Sign Up
									</Button>{" "}
								</Link>
							</div>
						)}
					</div>
				</Navbar>
			</div>
		);
	} else {
		return (
			<div>
				<Navbar expand="lg" bg="light" variant="light">
					<NavbarBrand>
						<img className="NavLogo" src={LogoNav} alt="NAV LOGO" />
					</NavbarBrand>
					<Nav className="me-auto">
						<NavLink
							exact
							to="/"
							style={{ textDecoration: "none", color: "grey", margin: "2px" }}
							className="navlink"
							activeClassName="selectedLink"
						>
							Home
						</NavLink>
						<NavLink
							to="/hotel"
							style={{ textDecoration: "none", color: "grey", margin: "2px" }}
							className="navlink"
							activeClassName="selectedLink"
						>
							Hotels
						</NavLink>
						<NavLink
							to="/hostel"
							style={{ textDecoration: "none", color: "grey", margin: "2px" }}
							className="navlink"
							activeClassName="selectedLink"
						>
							Hostels
						</NavLink>

						<NavLink
							to="/restaurant"
							style={{ textDecoration: "none", color: "grey", margin: "2px" }}
							className="navlink"
							activeClassName="selectedLink"
						>
							Restaurants
						</NavLink>

						<NavLink
							to="/contact"
							style={{ textDecoration: "none", color: "grey", margin: "2px" }}
							className="navlink"
							activeClassName="selectedLink"
						>
							Contact
						</NavLink>
					</Nav>
					<button className="btn_amb">Become A Woozzy Ambassador</button>{" "}
					<div className="cnxBtns">
						{isAuth ? (
							<>
								<Box sx={{ flexGrow: 0 }}>
									<Tooltip title="Open settings">
										<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
											<Avatar
												alt="User Profile Pic"
												src={avatarLogo}
												sx={{ width: 56, height: 56 }}
											/>
										</IconButton>
									</Tooltip>
									<Menu
										sx={{ mt: "45px" }}
										id="menu-appbar"
										anchorEl={anchorElUser}
										anchorOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										keepMounted
										transformOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										open={Boolean(anchorElUser)}
										onClose={handleCloseUserMenu}
									>
										<Link to="/Profile" style={{ textDecoration: "none" }}>
											<MenuItem
												onClick={() => {
													handleCloseUserMenu();
												}}
											>
												<Typography textAlign="center">Profile</Typography>
											</MenuItem>
										</Link>
										<Link to="/LogIn" style={{ textDecoration: "none" }}>
											<MenuItem
												onClick={() => {
													dispatch(logout());
													handleCloseUserMenu();
												}}
											>
												<Typography textAlign="center">
													<FontAwesomeIcon icon={faSignOutAlt} />
													Log Out
												</Typography>
											</MenuItem>
										</Link>
									</Menu>
								</Box>
							</>
						) : (
							<div className="NavBtn">
								<Link to="/LogIn" style={{ textDecoration: "none" }}>
									<Button variant="outline-dark" className="logInBtn">
										Log In
									</Button>{" "}
								</Link>
								<Link to="/register" style={{ textDecoration: "none" }}>
									<Button variant="success" className="signUpBtn">
										Sign Up
									</Button>{" "}
								</Link>
							</div>
						)}
					</div>
				</Navbar>
			</div>
		);
	}
};

export default NavBar;
