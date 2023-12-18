import { Button } from "react-bootstrap";
import { Container } from "../style/styled";
import styles from "../../src/style/ResultStyles.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useHeaderContext } from "../contexts/headerContexts";
import ResultHistory from "../components/ResultHistory";

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [userData] = useState(location.state)
  const {isOpen} = useHeaderContext()
  const onClick = () =>{
    navigate("/home")
  }

  //am states saxeli sheucvale tu ginda da dafetchili array sheinaxe aq
  const [data, setdata] = useState([])

  return (
    <Container color={isOpen ? '#272727' : '#e6e6fa'}>
      {/* <div className={styles.maindiv}>
        <div className={styles.box}>
          <div  className={styles.resultDiv}>
            <h1>Here is your result</h1>
            <h2>{userData.skill}</h2>
            <h3>{userData.points}/{userData.counter}</h3>
            <Button onClick={onClick}>Try Again</Button>
          </div>
        </div>
      </div> */}
      <div>
        {/* aq veubnebi tu data arsebobs gamochndes tuarada loadingze iyos mere arrays vmapav da shignita arraydan an objectebidan vigeb
         valuebs da vawodeb components propebis saxit 
        radgan backidan ori array wamova mogiwevs am ori arraydan valuebis amogeba ert arrayit qceva da ise chawodeba
        an rogorc ginda ar vici eg shen mogiwevs mofiqreba mara components rac uweria is unda chaawodo anu 
         da radgan mapav 10 object tu aris arrayshi ative gamochndeba, shegidzlia profilze ro maqvs 
        gaketebuli imas gadaxedo magalitad, mokled gadaxed gadmoxede yvelafers sheiswavle rogor mushaobs da aba shen ici :D
        */}
        {data? data.map((e) => 
            <ResultHistory
              question={e.question}
							fake_answers={e.fake_answers}
							answer={e.answer}
							usersAnswer={e.usersAnswer}
              />
              )
         :
         <p>loading...</p>
         }
      </div>
    </Container>
  );
};

export default ResultPage;
