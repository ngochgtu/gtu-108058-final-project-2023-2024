import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../src/style/pages.styles.css";
import { BASE_PATH } from "../api/ServerApi";
import { useUserContext } from "../contexts/userContexts";
import styles from "../style/auth.module.css";
import style from "../style/signUp.module.css";

const AuthPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { setUserData } = useUserContext();
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
				<div className={styles.auth_container}>
					<div className={styles.register_container}>
						<div className={styles.register_input}>
							<Form.Floating className="mb-3">
								<input
									className={styles.signin_input}
									type="email"
									placeholder="name@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								></input>
							</Form.Floating>
						</div>
						<div className={styles.register_input}>
							<Form.Floating>
								<input
									className={styles.signin_input}
									type="password"
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								></input>
							</Form.Floating>
						</div>
						<div className={styles.username_container}>
							<Col>
								<div className={styles.button_container}>
									<button
										className={styles.login_button}
										variant="primary"
										type="submit"
									>
										Login
									</button>
								</div>
							</Col>
							<Col>
								<p className={`${style.forgot_password} ${style.text_right}`}>
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
