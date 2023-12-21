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
  // const [userData] = useState(location.state)
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
        const flattenedResultHistory = data.flat();
        setResultHistory(flattenedResultHistory);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [resultHistory, setResultHistory] = useState([]);

  console.log(resultHistory.flat());

  return (
    <Container color={isOpen ? "#272727" : "#e6e6fa"}>
      {/* <div className={styles.maindiv}>
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
      </div> */}
      <div className={styles.result_history_container}>
        {/* aq veubnebi tu data arsebobs gamochndes tuarada loadingze iyos mere arrays vmapav da shignita arraydan an objectebidan vigeb
         valuebs da vawodeb components propebis saxit 
        radgan backidan ori array wamova mogiwevs am ori arraydan valuebis amogeba ert arrayit qceva da ise chawodeba
        an rogorc ginda ar vici eg shen mogiwevs mofiqreba mara components rac uweria is unda chaawodo anu 
         da radgan mapav 10 object tu aris arrayshi ative gamochndeba, shegidzlia profilze ro maqvs 
        gaketebuli imas gadaxedo magalitad, mokled gadaxed gadmoxede yvelafers sheiswavle rogor mushaobs da aba shen ici :D
        */}
        {/* {resultHistory.map((resultSet, setIndex) => (
          <div key={setIndex}>
            <h3>Set {setIndex + 1}</h3>
            {resultSet.map((result) => (
              <ResultHistory
                key={result.id}
                question={result.question}
                fake_answers={result.fake_answers}
                answer={result.answer}
                usersAnswer={result.usersAnswer}
              />
            ))}
          </div>
        ))} */}
        <div>
          {resultHistory.map((result) => (
            <ResultHistory
              key={result.id}
              question={result.question}
              fake_answers={result.fake_answers}
              answer={result.answer}
              usersAnswer={result.usersAnswer}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ResultPage;
