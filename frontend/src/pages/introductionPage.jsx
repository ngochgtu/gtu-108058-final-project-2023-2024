import React from 'react'
import { Container } from 'react-bootstrap'
import styles from "../style/Introduction.module.css"
import { useNavigate } from 'react-router-dom';
import { useHeaderContext } from '../contexts/headerContexts';

const IntroductionPage = () => {

    const navigate = useNavigate();
    const {isOpen} = useHeaderContext()


    const onStartTest = () => {
        navigate("/sign-in")
    }

  return (
    <Container style={{backgroundColor: `${isOpen ? '#272727' : 'white'}`}}>
        <div className={styles.header}>
            <h1>Welcome To Skill Verifier</h1>
            <p>Skills Verifier is a web application that helps you to verify your skills in a specific field. You can choose from a wide range of skills and difficulty levels and start your verification. The application will ask you questions and you will have to answer them. After you finish the verification, you will get a result based on your answers.</p>
            <div className={styles.button} onClick={onStartTest}><b>Start Your Test</b></div>
        </div>
    </Container>
  )
}

export default IntroductionPage