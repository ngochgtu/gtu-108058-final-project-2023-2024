import { Container, Row, Form, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../style/auth.styles.css";
import { BASE_PATH } from "../api/ServerApi";

const AuthPage = () => {
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    e.preventDefault();
    const data = await fetch(`${BASE_PATH}/api/user`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username: username }),
    });
    const json = await data.json();
    localStorage.setItem("user_id", json._id);
    localStorage.setItem("username", json.username);
    navigate("/home");
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <dev>
      <div className="auth_container">
        <div className="register_container">
          <div className="register_input">
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingInputCustom"
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
                type="password"
                placeholder="Password"
              />
              <label htmlFor="floatingPasswordCustom">Password</label>
            </Form.Floating>
          </div>
          <div className="username_container">
            <div className="username_input">
              <Form.Floating className="mb-3">
                <Form.Control
                  onChange={handleUsernameChange}
                  placeholder="username"
                />
                <label htmlFor="floatingInputCustom">Username</label>
              </Form.Floating>
            </div>
            <Col>
              <div className="button_container">
                <Button variant="primary" onClick={handleLogin}>
                  Login
                </Button>
              </div>
            </Col>
          </div>
        </div>
      </div>
    </dev>
  );
};

export default AuthPage;
