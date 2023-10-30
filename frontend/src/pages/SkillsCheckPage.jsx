import SkillCheck from "../components/SkillCheck";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {Col, Container, Row} from "react-bootstrap";
import {  Oval } from 'react-loader-spinner'

const SkillsCheckPage = () => {
    const [answer, setAnswer] = useState("Demo")
    const [question, setQuestion] = useState(null)
    const [counter, setCounter] = useState(0)

    const location = useLocation();

    const navigate = useNavigate()

    useEffect(() => {
        fetch_data();
    }, [location.state]);

    const fetch_data = () => {
        if (location.state) {
            const sillIds = location.state.map(e => e.value)
            fetch(`http://localhost:3001/api/questions?skills=${sillIds}`, {
                method: "GET"
            })
                .then((response) => response.json())
                .then((data) => {
                    setQuestion(data)
                })
                .catch((error) => console.log(error));
        }
    }

    const handleNextClick = async () => {
        const data = await fetch("http://localhost:3001/api/user_question", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                    username: localStorage.getItem("username"),
                    question_id: question._id,
                    answer: answer
                }
            )
        });
        const json = await data.json();
        console.log(json)

        setQuestion(null)
        setCounter(counter + 1)

        fetch_data();
    }

    const changeAnswer = useCallback((e) => {
        setAnswer(e.target.value);
    }, []);

    const handleFinishButton = () => {
        navigate("/result")
    }
    

    return <Container className="p-3">
        <Row style={{marginBottom: 50}}>
            <Col>
                Skills: {location.state ? location.state.map(e => {
                return e.label
            }) : ""}
            </Col>
        </Row>
        {question ?
            <Row>
                <Col>
                    <SkillCheck key={question._id} question={question} selectAnswer={changeAnswer}/>
                    <div style={{display: 'flex' , justifyContent: 'space-between'}}>
                        <Button variant="primary" onClick={handleNextClick}>Next</Button>
                        { counter >= 10 ? <Button variant="primary" onClick={handleFinishButton} >Finish</Button> : '' }
                    </div>
                    
                </Col>
            </Row> :
            <div style={{display:"flex", justifyContent:'center', alignItems:'center'}}>

                <Oval
                height={80}
                width={80}
                color="#4d4fa9"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
                />
                </div>
        }
    </Container>
}

export default SkillsCheckPage