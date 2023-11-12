import SkillCheck from "../components/SkillCheck";
import {useLocation} from "react-router-dom";
import React, {useCallback, useState} from "react";
import Button from "react-bootstrap/Button";
import {Col, Container, Row} from "react-bootstrap";
import {MagnifyingGlass} from 'react-loader-spinner'
import useFetch from "../hooks/useFetch";
import useRequest from "../hooks/useRequest";

const SkillsCheckPage = () => {
    const location = useLocation();
    const [answer, setAnswer] = useState("Demo")
    const {response, error, loading, resendRequest} = useFetch({url:`http://localhost:3001/api/questions?skills=${location.state.map(e => e.value)}`, method:"GET"})
    const {sendRequest, loading: loading2} = useRequest({url: 'http://localhost:3001/users/user_question', method: 'POST'})


    const changeAnswer = useCallback((e) => {
            setAnswer(e.target.value);
        }, []);
    const handleNextClick = async () => {
     
        sendRequest({
            username: localStorage.getItem("username"),
            question_id: response._id,
            answer: answer
        }).then(data => console.log(data))
        .catch(err => console.log(err))

        resendRequest()
    }

    
    if(loading || loading2 || !response){
        return <div style={{display: 'flex', justifyContent:"center", alignItems:'center'}}>
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
    if(error || !response){
        return <div style={{display: 'flex', justifyContent:"center", alignItems:'center'}}><h1>{Error}</h1></div>
    }

    if(response){
        console.log(response)
    }
    return <Container className="p-3">
        <Row style={{marginBottom: 10}}>
            <Col>
                Skills: {location.state ? location.state.map(e => {
                return e.label + ", "
            }) : ""}
            </Col>
        </Row>
        {response ?
            <Row>
                <Col>
                    <SkillCheck key={response._id} question={response} selectAnswer={changeAnswer}/>
                    <Button variant="primary" onClick={handleNextClick}>Next</Button>
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