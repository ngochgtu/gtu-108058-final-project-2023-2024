import { Form, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
// import axios from "axios";
import "../style/auth.styles.css";
import "../../src/style/pages.styles.css";

const AuthPage = () => {
	const [Email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:3001/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ Email, password }),
			});

			if (response.ok) {
				const data = await response.json();
				console.log("Login successful:", data);
			} else {
				console.error("Login failed");
			}
		} catch (error) {
			console.error("Error during login:", error);
		}
	};

	return (
		<div>
			<form onSubmit={handleLogin}>
				<div className="auth_container">
					<div className="register_container">
						<div className="register_input">
							<Form.Floating className="mb-3">
								<input
									className="signin_input"
									type="email"
									placeholder="name@example.com"
									value={Email}
									onChange={(e) => setEmail(e.target.value)}
								></input>
							</Form.Floating>
						</div>
						<div className="register_input">
							<Form.Floating>
								<input
									className="signin_input"
									type="password"
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								></input>
							</Form.Floating>
						</div>
						<div className="username_container">
							<Col>
								<div className="button_container">
									<button
										className="login_button"
										variant="primary"
										type="submit"
										onClick={handleLogin}
									>
										Login
									</button>
								</div>
							</Col>
							<Col>
								<p className="forgot-password text-right">
									Not registered <Link to="/sign-up">sign up?</Link>
								</p>
							</Col>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AuthPage;
