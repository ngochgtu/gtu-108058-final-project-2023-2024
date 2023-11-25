import React from "react";
import { Container } from "react-bootstrap";
import "../../src/style/pages.styles.css";
import styles from "../style/ErrorPgae.module.css";
import logo from "../assets/404-error.png";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const onBackToHome = ()=> {
    navigate("/")
  }

  return (
    <Container>
      <div className={styles.error_container}>
        <div className={styles.error__logo_container}>
          <img className={styles.error__logo} src={logo} alt="error"></img>
        </div>
        <h2 className={styles.error__massage_title}>
          Oh no,you've found our junior developer's homepage!
        </h2>
        <h3 className={styles.error__massage_content}>
          Despite sleeping on the couch most of the day, our junior web
          developer still finds time to do some coding...
        </h3>
        <button className={styles.error_button} onClick={onBackToHome}>
          back to homepage
        </button>
      </div>
    </Container>
  );
};

export default ErrorPage;
