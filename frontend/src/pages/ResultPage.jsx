import { Button } from "react-bootstrap";
import { Container } from "../style/styled";
import styles from "../../src/style/ResultStyles.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useHeaderContext } from "../contexts/headerContexts";

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData] = useState(location.state)
  const {isOpen} = useHeaderContext()
  const onClick = () =>{
    navigate("/home")
  }

  return (
    <Container color={isOpen ? '#272727' : '#e6e6fa'}>
      <div className={styles.maindiv}>
        <div className={styles.box}>
          <div  className={styles.resultDiv}>
            <h1>Here is your result</h1>
            <h2>{userData.skill}</h2>
            <h3>{userData.points}/{userData.counter}</h3>
            <Button onClick={onClick}>Try Again</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ResultPage;
