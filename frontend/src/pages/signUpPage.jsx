import { Form, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
// import { useNavigate } from "react-router-dom";
// import React,{ useRef } from "react";
import "../style/signUp.styles.css";
// import { BASE_PATH } from "../api/ServerApi";

const SignUpPage = () => {
  return (
    <div>
      <form
      //   onSubmit={handleSignUp}
      >
        <div className="signUp-container">
          <h3 className="signUp-title">Sign Up</h3>
          <div className="signUp--input__container">
            <label className="signUp-label">First name</label>
            <input
              type="text"
              className="signUp-input"
              placeholder="First name"
            />
          </div>
          <div className="signUp--input__container">
            <label className="signUp-label">Email address</label>
            <input
              type="email"
              className="signUp-input"
              placeholder="Enter email"
            />
          </div>
          <div className="signUp--input__container">
            <label className="signUp-label">Password</label>
            <input
              type="password"
              className="signUp-input"
              placeholder="Password"
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
            <button type="submit" className="signUp-button">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/sign-in">sign in?</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
