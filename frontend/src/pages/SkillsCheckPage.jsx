import SkillCheck from "../components/SkillCheck";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import "../../src/style/pages.styles.css";
import {Col, Container, Row} from "react-bootstrap";
import {MagnifyingGlass} from 'react-loader-spinner'
import useRequest from "../hooks/useRequest";

const SkillsCheckPage = () => {
    const location = useLocation();
    const [difficulty, setDifficulty] = useState('easy')
    const [question, setQuestion] = useState(null)
    const [answer, setAnswer] = useState("Demo")
    const [counter, setCounter] = useState(0)
    const {sendRequest} = useRequest({url: 'http://localhost:3001/users/user_question', method: 'POST'})
        
    const navigate = useNavigate()

    useEffect(() => {
        fetch_data();
    }, [location.state]);

    const fetch_data = () => {
        if (location.state) {
            fetch(`http://localhost:3001/api/questions?skills=${location.state.map(e => e.value)}&difficulty=${difficulty}`, {
                method: "GET"
            })
                .then((response) => response.json())
                .then((data) => {
                    setQuestion(data)
                })
                .catch((error) => console.log(error));
        }
    }

    const changeAnswer = useCallback((e) => {
            setAnswer(e.target.value);
        }, []);

    const handleNextClick = async () => {
        setCounter((i)=> i+1)
        sendRequest({
            email: localStorage.getItem("email"),
            question_id: question._id,
            answer: answer
        }).then(data => console.log(data))
        .catch(err => console.log(err))

        fetch('http://localhost:3001/api/result', {
            method: 'GET',
            headers:{
                "Content-Type": "application/json",
            },
        }).then(res => res.json())
        .then(data => {setQuestion(data); console.log(question)})
        .catch(err => console.log(err))
    }

    return <Container className="p-3">
        <Row style={{marginBottom: 10}}>
            <Col>
                Skills: {location.state ? location.state.map(e => {
                return e.label + ", "
            }) : ""}
            </Col>
        </Row>
       
        {question  ?
            <Row>
                <Col>
                    <SkillCheck key={question._id} question={question} selectAnswer={changeAnswer}/>
                    <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                        <Button variant="primary" onClick={handleNextClick}>Next</Button>
                        {counter >= 10 ? <Button variant="primary" onClick={navigate('/result',{state: question._id})} >Finish</Button> : ''}
                    </div>
                </Col>
            </Row> :
            <div style={{display: 'flex', justifyContent:"center", alignItems:'center'}}>
                <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor = '#c0efff'
                color = '#e15b64'
              />
            </div>
        }
    </Container>
}

export default SkillsCheckPage