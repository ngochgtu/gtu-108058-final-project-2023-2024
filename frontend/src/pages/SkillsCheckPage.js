import SkillCheck from "../components/SkillCheck";
import {useLocation} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {Col, Container, Row} from "react-bootstrap";
import {BASE_PATH} from "../api/ServerApi";

const SkillsCheckPage = () => {
    const [answer, setAnswer] = useState("Demo")
    const [question, setQuestion] = useState(null)

    const location = useLocation();

    useEffect(() => {
        fetch_data();
    }, []);

    const fetch_data = useCallback(() => {
        if (location.state) {
            const sillIds = location.state.map(e => e.value)
            fetch(`${BASE_PATH}/api/questions?skills=${sillIds}`, {
                method: "GET"
            })
                .then((response) => response.json())
                .then((data) => {
                    setQuestion(data)
                })
                .catch((error) => console.log(error));
        }
    }, [question])

    const handleNextClick = async () => {
        const data = await fetch(`${BASE_PATH}/api/user_question`, {
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
            <Col>Loading Question ...</Col>
        }
    </Container>
}

export default SkillsCheckPage