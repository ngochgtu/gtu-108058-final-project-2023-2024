import {Card} from "react-bootstrap";

const SkillCheck = ({question}) => {
    return <Card style={{marginBottom: 10}}>
        <Card.Body>
            <Card.Text>
                {question}
            </Card.Text>
        </Card.Body>
    </Card>
}

export default SkillCheck