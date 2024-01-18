import React from "react";
import { Container } from "react-bootstrap";
import styles from "../style/Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container>
      <div className={styles.footer_container}>
        <div className={styles.border}></div>
        <div className={styles.footer_content}>
          <div className={styles.footer_description}>
            <h1 className={styles.description_title}>
              Start Your Skill Journey Today!
            </h1>
            <span>
              Join Skill Verifier and embark on a journey of skill validation,
              personal growth, and professional success. Unleash your potential,
              connect with opportunities, and take your career to new heights.
              Sign up now and let your skills speak for themselves!
            </span>
          </div>
          <div className={styles.footer_social}>
            <h1 className={styles.social_title}>contact us</h1>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
