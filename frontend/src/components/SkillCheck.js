import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const SkillCheck = ({question}) => {
    return <Card style={{margin: 10}}>
        <Card.Body>
            <Card.Title>Question</Card.Title>
            <Card.Text>
                {question.question}
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
        </Card.Body>
    </Card>
}

export default SkillCheck