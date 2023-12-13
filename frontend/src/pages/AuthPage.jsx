import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../src/style/pages.styles.css";
import { BASE_PATH } from "../api/ServerApi";
import { useUserContext } from "../contexts/userContexts";
import styles from "../style/Verification.module.css";
import { useCookies } from "react-cookie";

const AuthPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { setUserData } = useUserContext();
	const [cookies, setCookie] = useCookies(["user"]);
	const expirationTime = 3600000;

	const [missingField, setMissingField] = useState({
		email: true,
		password: true,
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "email") {
			setEmail(value);
		} else if (name === "password") {
			setPassword(value);
		}
		setMissingField({ ...missingField, [name]: !!value });
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		const fixedField = { ...missingField };
		Object.keys({ email, password }).forEach((field) => {
			fixedField[field] = !!{ email, password }[field];
		});
		setMissingField(fixedField);

		if (Object.values(fixedField).some((valid) => !valid)) {
			return;
		}

		try {
			const response = await fetch(`${BASE_PATH}/auth/login`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (response.ok) {
				const user = await response.json();
				const result = {
					email: user.email,
					username: user.username,
					id: user._id,
				};
				setCookie("user", result, {
					expires: new Date(Date.now() + expirationTime),
					path: "/",
				});
				setUserData(result);
				navigate("/home");
			}
		} catch (error) {}
	};

	return (
		<div>
			<form onSubmit={handleLogin}>
				<div className={styles.container}>
					<div className={styles.obj1}>
						<h3 className={styles.title}>Sign In</h3>
					</div>
					<div className={styles.obj2}>
						<div className={styles.input_container}>
							<label className={styles.label}>Email</label>
							<input
								className={`${styles.input} ${
									missingField.email ? "" : styles.error
								}`}
								name="email"
								type="email"
								placeholder=" Name@example.com"
								value={email}
								onChange={handleChange}
							></input>
						</div>
						<div className={styles.input_container}>
							<label className={styles.label}>Password</label>
							<input
								className={`${styles.input} ${
									missingField.password ? "" : styles.error
								}`}
								name="password"
								type="password"
								placeholder=" ********"
								value={password}
								onChange={handleChange}
							></input>
						</div>
					</div>
					<div className={styles.obj3}>
						<div className={styles.button_container}>
							<button className={styles.button} variant="primary" type="submit">
								Login
							</button>
						</div>
						<p className={styles.link}>
							Don't have an account ? <Link to="/sign-up">sign up here</Link>
						</p>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AuthPage;
