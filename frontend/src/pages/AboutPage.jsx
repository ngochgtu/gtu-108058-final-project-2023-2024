import React from 'react'
import { Container } from '../style/styled'
import styles from '../style/About.module.css'
import { useHeaderContext } from '../contexts/headerContexts';
import { Link } from "react-router-dom";

const AboutPage = () => {
  const {isOpen} = useHeaderContext()
  return (
    <Container color={isOpen ? '#272727' : '#e6e6fa'}>
    <div className={`${styles.text} ${styles.justfy}`}>
      {/* -------------ABOUT US---------- */}
      <div className={styles.sectionBot}></div>
      <h2>About Skills Verifier</h2>
      <div className={styles.sectionTop}></div>

      <p className={styles.fontMed}>
        Welcome to Skills Verifier, an innovative platform developed by GTU
        Group 108058 for our final project.{" "}
      </p>
      <div className={styles.sectionBot}></div>

      {/* -------------MISSION---------- */}
      <h2>Mission</h2>
      <div className={styles.sectionTop}></div>
      <p className={`${styles.fontMed} ${styles.justfy}`}>
        Our mission at Skills Verifier is to revolutionize the skills
        assessment process using cutting-edge AI technology. We aim to provide
        users with a seamless and efficient way to evaluate and enhance their
        skills
      </p>
      <p className={`${styles.fontMed} ${styles.justfy}`}>
        To better understand it,{` `}
        <Link className={`${styles.SginUp}`} to="/sign-up">
          sign up
        </Link>
        , use the application on your own, and assess your skills using the
        available options
      </p>

      {/* -------------WHAT SETS US APART---------- */}
      <div className={styles.sectionBot}></div>
      <h2>What Sets Us Apart</h2>
      <div className={styles.sectionTop}></div>
      {/* -------------WHAT SETS US APART PART 1---------- */}

      <p className={`${styles.miniBold}`}>AI-Driven Question Generation</p>

      <p className={`${styles.fontMed} ${styles.justfy}`}>
        Skills Verifier stands out with its AI-powered question generation.
        Our advanced algorithms analyze various skill sets and curate
        personalized questions tailored to your proficiency level.
      </p>

      {/* -------------WHAT SETS US APART PART 2---------- */}

      <p className={`${styles.miniBold}`}>Intelligent Skill Assessment</p>

      <p className={`${styles.fontMed} ${styles.justfy}`}>
        Not just limited to question generation, our platform utilizes the
        same AI to evaluate your responses. Receive instant, accurate feedback
        on your skills, enabling continuous improvement.
      </p>

      {/* -------------HOW IT WORKS---------- */}
      <div className={styles.sectionBot}></div>
      <h2>How It Works</h2>
      <div className={styles.sectionTop}></div>
      {/* -------------HOW IT WORKS Part 1---------- */}
      <p className={`${styles.miniBold}`}>Sgin Up</p>

      <p className={`${styles.fontMed} ${styles.justfy}`}>
        Get started by creating an account. Your journey to skill verification
        begins here.
      </p>
      {/* -------------HOW IT WORKS Part 2---------- */}

      <p className={`${styles.miniBold}`}>Generate Questions</p>

      <p className={`${styles.fontMed} ${styles.justfy}`}>
        Utilize our AI-driven system to generate customized questions based on
        your chosen skill domains.
      </p>
      {/* -------------HOW IT WORKS Part 3---------- */}
      <p className={`${styles.miniBold}`}>Assess Your Skills</p>

      <p className={`${styles.fontMed} ${styles.justfy}`}>
        Dive into the assessment process. Answer the generated questions and
        let our AI analyze and grade your performance.
      </p>
      {/* -------------HOW IT WORKS Part 4---------- */}
      <p className={`${styles.miniBold}`}>Receive Feedback</p>
      <p className={`${styles.fontMed} ${styles.justfy}`}>
        Receive detailed feedback on your strengths and areas for improvement.
        Use this valuable insight to enhance your skills.
      </p>
    </div>
  </Container>
  );
};

export default AboutPage;
