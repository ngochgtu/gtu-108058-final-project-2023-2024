import "../../src/style/pages.styles.css";
import styles from "../style/Verification.module.css";
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

	const [missingField, setMissingField] = useState({
		username: true,
		email: true,
		password: true,
		confirmPassword: true,
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		setMissingField({ ...missingField, [name]: !!value });
	};

	const handleRegister = async (e) => {
		e.preventDefault();

		const fixedField = { ...missingField };
		Object.keys(formData).forEach((field) => {
			fixedField[field] = !!formData[field];
		});
		setMissingField(fixedField);

		if (Object.values(fixedField).some((valid) => !valid)) {
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
				navigate("/sign-in");
			} else {
			}
		} catch (error) {}
	};

	return (
		<form onSubmit={handleRegister}>
			<div className={styles.container}>
				<div className={styles.obj1}>
					<h3 className={styles.title}>Sign Up</h3>
				</div>
				<div className={styles.obj2}>
					<div className={styles.input_container}>
						<label className={styles.label}>Username</label>
						<input
							type="text"
							className={`${styles.input} ${
								missingField.username ? "" : styles.error
							}`}
							placeholder=" Username"
							name="username"
							value={formData.username}
							onChange={handleChange}
						/>
					</div>
					<div className={styles.input_container}>
						<label className={styles.label}>Email address</label>
						<input
							type="email"
							className={`${styles.input} ${
								missingField.email ? "" : styles.error
							}`}
							placeholder=" Name@example.com"
							name="email"
							value={formData.email}
							onChange={handleChange}
						/>
					</div>
					<div className={styles.input_container}>
						<label className={styles.label}>Password</label>
						<input
							type="password"
							className={`${styles.input} ${
								missingField.password ? "" : styles.error
							}`}
							placeholder=" ********"
							name="password"
							value={formData.password}
							onChange={handleChange}
						/>
					</div>
					<div className={styles.input_container}>
						<label className={styles.label}>Confirm Password</label>
						<input
							type="password"
							className={`${styles.input} ${
								missingField.confirmPassword ? "" : styles.error
							}`}
							placeholder=" ********"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className={styles.obj3}>
					<div className={styles.button_container}>
						<button type="submit" className={styles.button}>
							Sign Up
						</button>
					</div>
					<p className={styles.link}>
						Already have an account ? <Link to="/sign-in">sign in</Link>
					</p>
				</div>
			</div>
		</form>
	);
};

export default SignUpPage;
