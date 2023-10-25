import SkillCheck from "../components/SkillCheck";
import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {Col, Container, Row} from "react-bootstrap";

const SkillsCheckPage = () => {
    const [questions, setQuestions] = useState(null)

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
                    handleQuestions(data)
                })
                .catch((error) => console.log(error));
        }
    }

    const handleQuestions = (data) => {
        if (data && Array.isArray(data)) {
            setQuestions(data)
        }
    }

    const handleNextClick = () => {
        setQuestions(null)
        fetch_data();
    }

    return <Container className="p-3">
        <Row style={{marginBottom: 10}}>
            <Col>
                Skills: {location.state ? location.state.map(e => {
                return e.label + ", "
            }) : ""}
            </Col>
        </Row>
        {questions ? questions.map(e => {
            return <Row>
                <Col>
                    <SkillCheck key={e.id} question={e.question}/>
                    <Button variant="primary" onClick={handleNextClick}>Next</Button>
                </Col>
            </Row>
        }) : <Col>Loading Question ...</Col>}
    </Container>
}

export default SkillsCheckPage