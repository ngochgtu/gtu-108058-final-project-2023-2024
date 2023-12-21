import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Container } from "../style/styled";
import styles from "../../src/style/ResultStyles.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useHeaderContext } from "../contexts/headerContexts";
import ResultHistory from "../components/ResultHistory";
import { BASE_PATH } from "../api/ServerApi";

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData] = useState(location.state)
  const { isOpen } = useHeaderContext();
  const onClick = () => {
    navigate("/home");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_PATH}/users/resultHistory`, {
          method: "GET",
          credentials: "include",
      });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
    const answerMap = new Map(data[1].map(answer => [answer.question_id, answer.answer]));

    const combinedArray = data[0].map(question => {
    const answerObject = data[1].find(answer => answer.question_id === question._id);
    const mergedObject = { ...question, usersAnswers: answerObject ? answerObject.answer : null };
    return mergedObject;
});

        setResultHistory(combinedArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [resultHistory, setResultHistory] = useState([]);
  

  console.log(resultHistory);

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
      <div className={styles.result_history_container}>
        <div>
          {resultHistory.map((result) => (
            <ResultHistory
              key={result.id}
              question={result.question}
              fake_answers={result.fake_answers}
              answer={result.answer}
              usersAnswer={result.usersAnswers}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ResultPage;
