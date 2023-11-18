import { Form, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../style/auth.styles.css";
import "../../src/style/pages.styles.css";
import { BASE_PATH } from "../api/ServerApi";
import Backdrop from "../components/backdrop";

const AuthPage = () => {
  const [error, setError] = useState(false);
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const navigate = useNavigate();

	const handleLogin = async (e) => {
		try {
			const response = await fetch("http://localhost:3001/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
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

	const navigationMethod = () => {
		navigate("/home");
	};

	const handleButtonClick = () => {
		handleLogin();
		navigationMethod();
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
                    onClick={handleButtonClick}
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
