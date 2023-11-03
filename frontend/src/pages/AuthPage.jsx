import { Container, Row, Form, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../style/app.module.css";

const AuthPage = () => {
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const data = await fetch("http://localhost:3001/api/user", {
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
      <div className={styles.auth_container}>
        {/* <Container className="p-3"> */}
        <div className={styles.register_container}>
          <div className={styles.register_input}>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingInputCustom"
                type="email"
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInputCustom">Email address</label>
            </Form.Floating>
          </div>
          <div className={styles.register_input}>
            <Form.Floating>
              <Form.Control
                id="floatingPasswordCustom"
                type="password"
                placeholder="Password"
              />
              <label htmlFor="floatingPasswordCustom">Password</label>
            </Form.Floating>
          </div>
          <div className={styles.username_container}>
            <div className={styles.username_input}>
              <Form.Floating className="mb-3">
                <Form.Control
                  onChange={handleUsernameChange}
                  placeholder="username"
                />
                <label htmlFor="floatingInputCustom">Username</label>
              </Form.Floating>
            </div>
            <Col>
              <div className={styles.button_container}>
                <Button variant="primary" onClick={handleLogin}>
                  Login
                </Button>
              </div>
            </Col>
          </div>
        </div>
        {/* </Container> */}
      </div>
    </dev>
  );
};

export default AuthPage;
