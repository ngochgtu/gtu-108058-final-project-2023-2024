import SkillCheck from "../components/SkillCheck";
import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {Col, Container, Row} from "react-bootstrap";

const SkillsCheckPage = () => {
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

    const handleNextClick = () => {
        setQuestion(null)
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
        {question ?
            <Row>
                <Col>
                    <SkillCheck key={question._id} question={question.question}/>
                    <Button variant="primary" onClick={handleNextClick}>Next</Button>
                </Col>
            </Row> :
            <Col>Loading Question ...</Col>
        }
    </Container>
}

export default SkillsCheckPage