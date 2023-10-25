import {Card, Form} from "react-bootstrap";

const SkillCheck = ({question}) => {
    return <Card style={{marginBottom: 10}}>
        <Card.Body>
            <Card.Text>
                <b>{question.question}</b>
                <Form style={{marginBottom: 10, marginTop: 10}}>
                    {question.fake_answers.map(fa => {
                        return <Form.Check
                            key={fa}
                            type='radio'
                            label={fa}
                            name="group1"
                        />
                    })}
                </Form>
            </Card.Text>
        </Card.Body>
    </Card>
}

export default SkillCheck