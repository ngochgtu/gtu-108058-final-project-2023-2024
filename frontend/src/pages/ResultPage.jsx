import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Container } from "../style/styled";
import styles from "../../src/style/ResultStyles.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useHeaderContext } from "../contexts/headerContexts";
import ResultHistory from "../components/ResultHistory";
import { BASE_PATH } from "../api/ServerApi";
import Modal from "../components/Modal";

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData] = useState(location.state);
  const { isOpen } = useHeaderContext();
  const [resultHistory, setResultHistory] = useState([]);
  const [resultId, setResultId] = useState("");
  const [open, setOpen] = useState(false);

  const onClick = () => {
    navigate("/home");
  };

  const onShare = () => {
    setOpen(true);
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
        setResultHistory(data[0]);
        setResultId(data[1]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container color={isOpen ? "#272727" : "#e6e6fa"}>
      <div className={styles.result_history_container}>
        <div>
          <div className={styles.resultDiv}>
            <h1>RESULT</h1>
            <h2>{userData.skill}</h2>
            <h3>
              {userData.points}/{userData.counter - 1}
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop: 15,
              }}
            >
              <Button onClick={onClick}>Try Again</Button>
              <Button onClick={onShare}>Share</Button>
            </div>
          </div>
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
      {open ? <Modal value={resultId} setOpen={setOpen} /> : " "}
    </Container>
  );
};

export default ResultPage;
