import "../../src/style/pages.styles.css";
import "../style/signUp.styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BASE_PATH } from "../api/ServerApi";
// import axios from "axios";

const SignUpPage = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleRegister = async () => {
		try {
			const response = await fetch(`${BASE_PATH}/users/user`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username ,email, password, }),
			})

			if (response.ok) {
				const data = await response.json();
				console.log("Registration successful:", data);
			} else {
				console.error("Registration failed");
			}
		} catch (error) {
			console.error("Error during registration:", error);
		}
	};

	const navigationMethod = () => {
		navigate("/sign-in");
	};

	const handleButtonClick = () => {
		handleRegister();
		navigationMethod();
	};

	return (
		<div>
			<form>
				<div className="signUp-container">
					<h3 className="signUp-title">Sign Up</h3>
					<div className="signUp--input__container">
						<label className="signUp-label">User name</label>
						<input
							type="text"
							className="signUp-input"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="signUp--input__container">
						<label className="signUp-label">Email address</label>
						<input
							type="email"
							className="signUp-input"
							placeholder="Enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="signUp--input__container">
						<label className="signUp-label">Password</label>
						<input
							type="password"
							className="signUp-input"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="signUp--input__container">
						<label className="signUp-label">Confirm Password</label>
						<input
							type="password"
							className="signUp-input"
							placeholder="Password"
						/>
					</div>
					<div className="signUp--button_container">
						<button
							type="submit"
							className="signUp-button"
							onClick={handleButtonClick}
						>
							Sign Up
						</button>
					</div>
					<p className="forgot-password text-right">
						Already registered <Link to="/sign-in">sign in</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default SignUpPage;
