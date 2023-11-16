import React from "react";
import { Container } from "react-bootstrap";
import "../../src/style/pages.styles.css";
import "../style/ErrorPgae.styles.css";
import logo from "../assets/404-error.png";

const ErrorPage = () => {
  return (
    <Container>
      <div className="error-container">
        <div className="error__logo--container">
          <img className="error__logo" src={logo} alt="error"></img>
        </div>
        <h2 className="error__massage--title">
          Oh no,you've found our junior developer's homepage!
        </h2>
        <h3 className="error__massage--content">
          Despite sleeping on the couch most of the day, our junior web
          developer still finds time to do some coding...
        </h3>
        <button className="error_button">back to homepage</button>
      </div>
    </Container>
  );
};

export default ErrorPage;
