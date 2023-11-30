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

	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleRegister = async (e) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
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
				// const data = await response.json();
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
							className={styles.input}
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
							className={styles.input}
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
							className={styles.input}
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
							className={styles.input}
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
