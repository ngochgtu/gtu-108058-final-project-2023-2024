import React from "react";
import { Container } from "react-bootstrap";
import styles from "../style/About.module.css";

import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <Container>
      <div style={{ textAlign: "center" }} className={styles.text}>
        About Page
        <p>This app was made as a final project by GTU group 108058</p>
        <p>
          he app is a skills verifier that utilizes AI to generate questions and
          subsequently employs the same AI to assess your skills.
        </p>
        <p>
          To better understand it,
          <Link className={`${styles.SginUp}`} to="/sign-up">
            sign up
          </Link>
          , use the application on your own, and assess your skills using the
          available options
        </p>
      </div>
    </Container>
  );
};

export default AboutPage;
