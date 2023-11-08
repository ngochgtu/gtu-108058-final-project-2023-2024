import { Form, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import React,{ useRef } from "react";
import "../style/auth.styles.css";
import { BASE_PATH } from "../api/ServerApi";

const AuthPage = () => {
  
  const usernameRef = useRef('')
  const emailRef = useRef('')
  const passwordRef = useRef('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if(usernameRef.current.value && emailRef.current.value && passwordRef.current.value){
        const data = await fetch(`${BASE_PATH}/api/user`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }),
        });
        const json = await data.json();
        localStorage.setItem("user_id", json._id);
        localStorage.setItem("username", json.username);
        navigate("/home");
    }else{
        alert("Please fill out all fields")
    }
  };

  

  return (
    <dev>
      <form onSubmit={handleLogin}>
        <div className="auth_container">
          <div className="register_container">
            <div className="username_input">
                <Form.Floating className="mb-3">
                  <Form.Control
                    ref={usernameRef}
                    placeholder="username"
                    />
                  <label htmlFor="floatingInputCustom">Username</label>
                </Form.Floating>
              </div>
            <div className="register_input">
              <Form.Floating className="mb-3">
                <Form.Control
                  id="floatingInputCustom"
                  ref={emailRef}
                  type="email"
                  placeholder="name@example.com"
                  />
                <label htmlFor="floatingInputCustom">Email address</label>
              </Form.Floating>
            </div>
            <div className="register_input">
              <Form.Floating>
                <Form.Control
                  id="floatingPasswordCustom"
                  ref={passwordRef}
                  type="password"
                  placeholder="Password"
                  />
                <label htmlFor="floatingPasswordCustom">Password</label>
              </Form.Floating>
            </div>
            <div className="username_container">
              
              <Col>
                <div className="button_container">
                  <Button variant="primary" type="submit" >
                    Login
                  </Button>
                </div>
              </Col>
            </div>
          </div>
        </div>
      </form>
    </dev>
  );
};

export default AuthPage;
