import {Container, Row, Form, Col} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const AuthPage = () => {
    const [username, setUsername] = useState("")

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = await fetch("http://localhost:3001/api/user", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({username: username})
        });
        const json = await data.json();
        localStorage.setItem("user_id", json._id)
        localStorage.setItem("username", json.username)
        navigate("/home");
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    return <dev>
        <Container className="p-3">
            <Form onSubmit={handleLogin}>
                <Row>
                    <Form.Group className="mb-3">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control onChange={handleUsernameChange}/>
                    </Form.Group>
                </Row>
                <Row>
                    <Col>
                        <Button variant="primary" type="submit">Login</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    </dev>
}

export default AuthPage