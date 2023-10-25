import {useEffect, useState} from "react";
import Select from 'react-select'
import Button from 'react-bootstrap/Button';
import {Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const [skills, setSkills] = useState([])
    const [selectedSkills, setSelectedSkills] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch("http://localhost:3001/api/skills");
            const json = await data.json();
            if (json && Array.isArray(json)) {
                setSkills(json.map(e => {
                    return {value: e._id, label: e.name}
                }))
            } else {
                setSkills([{value: "empty", label: data["message"]}])
            }
        }
        fetchData().catch(console.error);
    }, []);

    const handleStartClick = (e) => {
        navigate("/check", {state: selectedSkills});
    }

    const handleSkillChange = (e) => {
        setSelectedSkills(e)
    }

    return <div>
        <Container className="p-3">
            <Row>
                <h2 className="header">Select Skills</h2>
            </Row>
            <Row style={{marginTop: 10, marginBottom: 10}}>
                <Select options={skills}
                        isMulti
                        name="colors"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleSkillChange}
                />
            </Row>
            <Row>
                <Col>
                    <Button variant="primary" onClick={handleStartClick}>Start</Button>
                </Col>
            </Row>
        </Container>
    </div>
}

export default HomePage