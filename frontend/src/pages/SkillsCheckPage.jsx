import SkillCheck from "../components/SkillCheck";
import { useNavigate} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import "../../src/style/pages.styles.css";
import {Col, Row} from "react-bootstrap";
import { Container } from "../style/styled";
import {MagnifyingGlass} from 'react-loader-spinner'
import useRequest from "../hooks/useRequest";
import { useUserContext } from "../contexts/userContexts";
import { useHeaderContext } from "../contexts/headerContexts";

const SkillsCheckPage = () => {
    const [difficulty] = useState('easy')
    const [question, setQuestion] = useState(null)
    const [answer, setAnswer] = useState("Demo")
    const [counter, setCounter] = useState(0)
    const {sendRequest} = useRequest({url: 'http://localhost:3001/users/user_question', method: 'POST'})
    const {selectedSkills,difficulty: diff} = useUserContext()
    const {isOpen} = useHeaderContext()
        
    const navigate = useNavigate()

    useEffect(() => {
        fetch_data();
    }, [selectedSkills, diff]);
    
    const fetch_data = () => {
        if (selectedSkills) {
            fetch(`http://localhost:3001/api/questions?skills=${selectedSkills.map(e => e.value)}&difficulty=${diff ? diff[0].label : difficulty}`, {
                method: "GET"
            })
                .then((response) => response.json())
                .then((data) => {
                    setQuestion(data)
                })
                .catch((error) => console.log(error));
        }
    }

    const changeAnswer = useCallback((e) => {
            setAnswer(e.target.value);
        }, []);

    const handleNextClick = async () => {
        setCounter(counter + 1)
        sendRequest({
            email: localStorage.getItem("email"),
            question_id: question._id,
            answer: answer
        }).then(data => console.log(data))
        .catch(err => console.log(err))

        fetch_data()
        if(counter % 10 === 0){
            setQuestion(null)
        }
    }
    
    const onFinish = async()=> {
        await fetch('http://localhost:3001/users/result', {
            method: 'GET',
            headers:{
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(data => {
            navigate('/result',{state: {...data, counter: counter}})
        })
        .catch(err => console.log(err))  
    }

    return <Container color={isOpen ? '#272727' : '#e6e6fa'} className="p-3">
        <Row style={{marginBottom: 10}}>
            <Col>
                Skills: {selectedSkills ? selectedSkills.map(e => {
                return e.label + ", "
            }) : ""}
            </Col>
        </Row>
       
        {question  ?
            <Row>
                <Col>
                    <SkillCheck key={question._id} question={question} selectAnswer={changeAnswer}/>
                    <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                        <Button variant="primary" onClick={handleNextClick}>Next</Button>
                        {counter > 10 ? <Button variant="primary" onClick={onFinish} >Finish</Button> : ''}
                    </div>
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