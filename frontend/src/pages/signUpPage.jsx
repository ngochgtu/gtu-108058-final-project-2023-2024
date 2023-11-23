import "../../src/style/pages.styles.css";
import "../style/signUp.styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BASE_PATH } from "../api/ServerApi";

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const navigate = useNavigate();

	const [passwordError, setPasswordError] = useState("");

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setPasswordError("");
	};

	const handleRegister = async (e) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			setPasswordError("Passwords do not match");
			return;
		}

		try {
			const response = await fetch(`${BASE_PATH}/users/user`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: formData.username,
					email: formData.email,
					password: formData.password,
				}),
			});

			if (response.ok) {
				const data = await response.json();
				console.log("Registration successful:", data);
				navigate("/sign-in");
			} else {
				console.error("Registration failed");
			}
		} catch (error) {
			console.error("Error during registration:", error);
		}
	};

	return (
		<div>
			<form onSubmit={handleRegister}>
				<div className="signUp-container">
					<h3 className="signUp-title">Sign Up</h3>
					<div className="signUp--input__container">
						<label className="signUp-label">User name</label>
						<input
							type="text"
							className="signUp-input"
							placeholder="Username"
							name="username"
							value={formData.username}
							onChange={handleChange}
						/>
					</div>
					<div className="signUp--input__container">
						<label className="signUp-label">Email address</label>
						<input
							type="email"
							className="signUp-input"
							placeholder="Enter email"
							name="email"
							value={formData.email}
							onChange={handleChange}
						/>
					</div>
					<div className="signUp--input__container">
						<label className="signUp-label">Password</label>
						<input
							type="password"
							className="signUp-input"
							placeholder="Password"
							name="password"
							value={formData.password}
							onChange={handleChange}
						/>
					</div>
					<div className="signUp--input__container">
						<label className="signUp-label">Confirm Password</label>
						<input
							type="password"
							className="signUp-input"
							placeholder="Password"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
						/>
					</div>
					<div className="signUp--button_container">
						<button type="submit" className="signUp-button">
							Sign Up
						</button>
					</div>
					<p className="forgot-password text-right">
						Already registered? <Link to="/sign-in">sign in</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default SignUpPage;
