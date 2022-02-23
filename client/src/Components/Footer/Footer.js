import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
	faLinkedin,
	faTwitter,
	faInstagram,
	faFacebook,
} from "@fortawesome/free-brands-svg-icons";

import logo from "../../assets/Logo_Navbar.png";

import "./Footer.css";

const Footer = () => {
	return (
		<div className="site-footer">
			<br />
			{/* <div className="container"> */}
			<div className="row">
				<div className="col-sm-12 col-md-6">
					<h4>Woozzy</h4>
					<p className="text-justify">
						A full travel guidance platform that facilitates every digital
						nomad's life to provide the best experience possible .
					</p>
					<img
						src={logo}
						alt="Woozzy Logo"
						style={{ width: "280px" }}
						className="footer-links"
					/>
				</div>

				<div className="col-sm-12 col-md-6">
					<h4>Quick Links</h4>
					<ul className="footer-links">
						<li>
							<a href="#About-Us">About Us</a>
						</li>
						<li>
							<a href="contact">Contact Us</a>
						</li>
						<li>
							<a href="#Privacy-Policy">Privacy Policy</a>
						</li>
					</ul>
					<br />
					<br />
					<br />
					<br />
					<div className="col-md-4 col-sm-6 col-xs-12">
						<ul className="social-icons">
							<li>
								<a className="facebook" href="#facebook">
									<FontAwesomeIcon icon={faFacebook} />
								</a>
							</li>
							<li>
								<a className="twitter" href="#twitter">
									<FontAwesomeIcon icon={faTwitter} />
								</a>
							</li>
							<li>
								<a className="instagram" href="#instagram">
									<FontAwesomeIcon icon={faInstagram} />
								</a>
							</li>
							<li>
								<a className="linkedin" href="#linkedin">
									<FontAwesomeIcon icon={faLinkedin} />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<hr />
			<div className="container">
				<div className="row">
					<p className="copyright-text">
						Copyright &copy; 2022 All Rights Reserved by
						<a href="#Woozzy"> Woozzy</a>.
					</p>
					<p>
						Created by
						<a href="https://github.com/MarwenKing15"> Marwen Touati</a>
					</p>
				</div>
			</div>
		</div>
		// </div>
	);
};

export default Footer;
