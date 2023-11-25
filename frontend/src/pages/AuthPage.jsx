import { Form, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_PATH } from "../api/ServerApi";
import "../style/auth.styles.css";
import "../../src/style/pages.styles.css";

const AuthPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userData, setUserData] = useState(null);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${BASE_PATH}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (response.ok) {
				const user = await response.json();
				setUserData(user);
				setError(null);
				navigate("/home");
			} else {
				setError("Invalid email or password");
			}
		} catch (error) {
			setError("Invalid email or password");
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
									value={email}
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
									>
										Login
									</button>
								</div>
							</Col>
							<Col>
								<p className="forgot-password text-right">
									Not registered? <Link to="/sign-up">sign up?</Link>
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
