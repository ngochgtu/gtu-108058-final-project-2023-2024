import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Container } from "../style/styled";
import styles from "../../src/style/ResultStyles.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useHeaderContext } from "../contexts/headerContexts";
import { BASE_PATH } from "../api/ServerApi";

const ResultPage = () => {
  const [resultHistory, setResultHistory] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [userData] = useState(location.state);
  const { isOpen } = useHeaderContext();
  const onClick = () => {
    navigate("/home");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_PATH}/users/resultHistory`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setResultHistory(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container color={isOpen ? "#272727" : "#e6e6fa"}>
      <div className={styles.maindiv}>
        <div className={styles.box}>
          <div className={styles.resultDiv}>
            <h1>Here is your result</h1>
            <h2>{userData.skill}</h2>
            <h3>
              {userData.points}/{userData.counter}
            </h3>
            <Button onClick={onClick}>Try Again</Button>
          </div>
        </div>
      </div>
      <div>
        <h2>Result History</h2>
        <ul>
          {resultHistory.map((result, index) => (
            <li key={index}>
              <strong>Question:</strong> {result.question}
              <br />
              <strong>Correct Answer:</strong> {result.correctAnswer}
              <br />
              <strong>User Answer:</strong> {result.userAnswer}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default ResultPage;
