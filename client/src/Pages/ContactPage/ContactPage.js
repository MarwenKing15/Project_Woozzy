// import React, { useState } from "react";
import React from "react";

import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

import "./ContactPage.css";

const ContactPage = () => {
	const SERVICE_ID = process.env.SERVICE_ID || "service_kudcfxk";
	const TEMPLATE_ID = process.env.TEMPLATE_ID || "template_b2ch4mw";
	const USER_ID = process.env.USER_ID || "user_WOwvxU3YnxPMK9vh9Fa2d";

	// const [contact, setContact] = useState({ name: "", email: "", message: "" });

	// const handleChange = (e) => {
	// 	setContact({ ...contact, [e.target.name]: e.target.value });
	// };

	const handleOnSubmit = (e) => {
		e.preventDefault();
		emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID).then(
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
		e.target.reset();
	};

	return (
		<div>
			<form onSubmit={handleOnSubmit}>
				<input
					name="name"
					// value={contact.name}
					// onChange={handleChange}
					type="text"
					className="feedback-input"
					placeholder="Name"
				/>
				<input
					name="email"
					// value={contact.email}
					// onChange={handleChange}
					type="text"
					className="feedback-input"
					placeholder="Email"
				/>
				<textarea
					name="message"
					// value={contact.message}
					// onChange={handleChange}
					className="feedback-input"
					placeholder="Comment"
				></textarea>
				<input
					type="submit"
					value="SUBMIT"
					// onClick={() => {
					// 	setContact({ name: "", email: "", message: "" });
					// }}
				/>
			</form>
		</div>
	);
};

export default ContactPage;
