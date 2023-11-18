import React from 'react'
import { Container } from 'react-bootstrap'
import "../style/About.styles.css"
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {

    const navigate = useNavigate();


    const onStartTest = () => {
        navigate("/sign-in")
    }


  return (
    <Container>
        <div className='header'>
            <h1>Welcome To Skill Verifier</h1>
            <p>Skills Verifier is a web application that helps you to verify your skills in a specific field. You can choose from a wide range of skills and difficulty levels and start your verification. The application will ask you questions and you will have to answer them. After you finish the verification, you will get a result based on your answers.</p>
            <div className='button' onClick={onStartTest}><b>Start Your Test</b></div>
        </div>
    </Container>
  )
}

export default AboutPage