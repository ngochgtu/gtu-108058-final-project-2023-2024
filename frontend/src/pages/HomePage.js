import {useEffect, useState} from "react";
import Select from 'react-select'
import Button from 'react-bootstrap/Button';
import {Col, Container, Row} from "react-bootstrap";

const HomePage = () => {
    const [skills, setSkills] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/api/skills", {
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {
                handleData(data)
            })
            .catch((error) => console.log(error));
    }, []);

    const handleData = (data) => {
        let temp = data;
        if (temp && Array.isArray(temp)) {
            setSkills(temp.map(e => {
                return {value: e._id, label: e.name}
            }))
        } else {
            setSkills([{value: "empty", label: data["message"]}])
        }
    }

    return <div>
        <Container className="p-3">
            <Row>
                <h1 className="header">Welcome To Sills Verifier</h1>
            </Row>
            <Row style={{marginTop: 10, marginBottom: 10}}>
                <Select options={skills}
                        isMulti
                        name="colors"
                        className="basic-multi-select"
                        classNamePrefix="select"/>
            </Row>
            <Row>
                <Col><Button variant="primary">Start</Button></Col>
            </Row>
        </Container>
    </div>
}

export default HomePage