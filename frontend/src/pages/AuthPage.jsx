import { Form, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, { useRef } from "react";
import "../style/auth.styles.css";
import "../../src/style/pages.styles.css";
import { BASE_PATH } from "../api/ServerApi";

const AuthPage = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if(emailRef.current.value && passwordRef.current.value){
        const data = await fetch(`${BASE_PATH}/auth/login`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }),
          credentials: 'include'
        });
        const json = await data.json();
        console.log(json)
        localStorage.setItem("user_id", json._id);
        localStorage.setItem("email", json.email);
        navigate("/home");
    }else{
        alert("Please fill out all fields")
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
                  ref={emailRef}
                  type="email"
                  placeholder="name@example.com"
                ></input>
              </Form.Floating>
            </div>
            <div className="register_input">
              <Form.Floating>
                <input
                  className="signin_input"
                  ref={passwordRef}
                  type="password"
                  placeholder="Password"
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
                  Not registered <a href="/#/sign-up">sign up?</a>
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
