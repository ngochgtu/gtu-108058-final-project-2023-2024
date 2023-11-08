import { Col, Container, Row } from "react-bootstrap";
import styles from "../style/app.module.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import logo from "../assets/zombie_icon.png";
import logout from "../assets/logout.png";
import { useEffect } from "react";

const Header = () => {
  return (
    <Container className="p-3">
      <Row>
        <div className={styles.container}>
          <Col>
            <h1 className={styles.title}>Skills Verifier</h1>
          </Col>
          <div className={styles.img_container}>
            <img src={logo} className={styles.img}></img>
          </div>
          <div className={styles.content}>
            <span>welcome {localStorage.getItem("username")}</span>
          </div>
          <div className={styles.button_container}>
            <button className={styles.button}>
              <img src={logout} className={styles.img_logout}></img>
            </button>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Header;
