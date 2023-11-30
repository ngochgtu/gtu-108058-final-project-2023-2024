import "../../src/style/pages.styles.css";
import styles from "../style/signUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { BASE_PATH } from "../api/ServerApi";
import "../../src/style/pages.styles.css";
import { useState } from "react";

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [usernameError, setUserNameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");

	const navigate = useNavigate();

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

		// if (!email) {
		// }

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
				<div className={styles.signUp_container}>
					<h3 className={styles.signUp_title}>Sign Up</h3>
					<div className={styles.signUp_input__container}>
						<label className={styles.signUp_label}>User name</label>
						<input
							type="text"
							className={styles.signUp_input}
							placeholder="Username"
							name="username"
							value={formData.username}
							onChange={handleChange}
						/>
					</div>
					<div className={styles.signUp_input__container}>
						<label className={styles.signUp_label}>Email address</label>
						<input
							type="email"
							className={styles.signUp_input}
							placeholder="Enter email"
							name="email"
							value={formData.email}
							onChange={handleChange}
						/>
					</div>
					<div className={styles.signUp_input__container}>
						<label className={styles.signUp_label}>Password</label>
						<input
							type="password"
							className={styles.signUp_input}
							placeholder="Password"
							name="password"
							value={formData.password}
							onChange={handleChange}
						/>
					</div>
					<div className={styles.signUp_input__container}>
						<label className={styles.signUp_label}>Confirm Password</label>
						<input
							type="password"
							className={styles.signUp_input}
							placeholder="Password"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
						/>
					</div>
					<div className={styles.signUp_button__container}>
						<button type="submit" className={styles.signUp_button}>
							Sign Up
						</button>
					</div>
					<p className={`${styles.forgot_password} ${styles.text_right}`}>
						Already registered? <Link to="/sign-in">sign in</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default SignUpPage;
