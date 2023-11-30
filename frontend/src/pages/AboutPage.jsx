import React from 'react'
import { Container } from '../style/styled'
import styles from '../style/About.module.css'
import { useHeaderContext } from '../contexts/headerContexts';
import { Link } from "react-router-dom";

const AboutPage = () => {
  const {isOpen} = useHeaderContext()
  return (
    <Container>
      <div className={styles.aboutPage_container}>
        <h1 className={styles.aboutUs_title}>About Us</h1>
        <div className={styles.about_us}>
          At Skill Verifier, we believe in the power of skills. Our platform is
          designed to empower individuals to showcase their talents, validate
          their expertise and connect with opportunities that align with their
          abilities. Whether you're a seasoned professional or just starting
          your journey, Skill Verifier is your partner in skill validation. Our
          mission at Skills Verifier is to revolutionize the skills assessment
          process using cutting-edge AI technology. We aim to provide users with
          a seamless and efficient way to evaluate and enhance their skills.
        </div>
        <h1 className={styles.aboutPage_titles}>What We Offer</h1>
        <div className={styles.offer_info}>
          <h2 className={styles.aboutPage_subTitles}>
            Skill Validation Services
          </h2>
          <span>
            Our comprehensive skill validation services ensure that your
            abilities are accurately assessed and recognized. Showcase your
            expertise with verified certifications and credentials that boost
            your credibility in the eyes of employers, clients, and
            collaborators.
          </span>
          <h2 className={styles.aboutPage_subTitles}>
            Personalized Skill Portfolios
          </h2>
          <span>
            Create a dynamic and visually appealing skill portfolio that
            highlights your strengths and accomplishments. Showcase your skills
            in a way that sets you apart in the competitive landscape.
          </span>
          <span>
            Continuous Learning Resources Stay ahead in your field with our
            curated collection of learning resources.Skill Verifier supports
            your ongoing learning journey.
          </span>
        </div>
        <h1 className={styles.aboutPage_titles}>How It Works </h1>
        <div className={styles.instruction}>
          <span>
            <p>
              1.Create Your Profile: Sign up and build a comprehensive profile
              that showcases your skills and experiences.
            </p>
            <p>
              2.Verify Your Skills: Utilize our skill validation services to
              ensure your capabilities are accurately represented.
            </p>
          </span>
        </div>
        <h1 className={styles.aboutPage_titles}>Why Choose Skill Verifier? </h1>
        <div className={styles.why_us}>
          <span>
            <span>
              <p>
                1.Accuracy: Our skill validation services ensure that your
                abilities are accurately assessed and recognized.
              </p>
              <p>
                2.Visibility: Showcase your skills to a global audience and
                stand out in a competitive job market.
              </p>
            </span>
          </span>
        </div>
        <h1 className={styles.aboutPage_titles}>What Sets Us Apart</h1>
        <div className={styles.aboutPage_differnce}>
          <span>
            AI-Driven Question Generation Skills Verifier stands out with its
            AI-powered question generation. Our advanced algorithms analyze
            various skill sets and curate personalized questions tailored to
            your proficiency level. Intelligent Skill Assessment Not just
            limited to question generation, our platform utilizes the same AI to
            evaluate your responses. Receive instant, accurate feedback on your
            skills, enabling continuous improvement.
          </span>
        </div>
      </div>
    </Container>
  );
};

export default AboutPage;
