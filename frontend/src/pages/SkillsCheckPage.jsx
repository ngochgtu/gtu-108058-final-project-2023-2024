import SkillCheck from "../components/SkillCheck";
import {useLocation} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {Col, Container, Row} from "react-bootstrap";
import {MagnifyingGlass} from 'react-loader-spinner'

const SkillsCheckPage = () => {
    const [answer, setAnswer] = useState("Demo")
    const [question, setQuestion] = useState(null)

    const location = useLocation();

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

        fetch_data();
    }

    const changeAnswer = useCallback((e) => {
        setAnswer(e.target.value);
    }, []);

    return <Container className="p-3">
        <Row style={{marginBottom: 10}}>
            <Col>
                Skills: {location.state ? location.state.map(e => {
                return e.label + ", "
            }) : ""}
            </Col>
        </Row>
        {question ?
            <Row>
                <Col>
                    <SkillCheck key={question._id} question={question} selectAnswer={changeAnswer}/>
                    <Button variant="primary" onClick={handleNextClick}>Next</Button>
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