import React, { useEffect, useState } from 'react'
import styles from '../style/ResultStyles.module.css'
import ResultHistory from '../components/ResultHistory'
import { BASE_PATH } from '../api/ServerApi'
import { useParams } from 'react-router-dom'

const SharedPage = () => {

    
  const [resultHistory, setResultHistory] = useState([]);
  const [userData, setUserData] = useState([]);

  const {id} = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_PATH}/users/shared?info=${id}`, {
          method: "GET",
          credentials: "include",
      });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const modifiedResultHistory = data.data.saved_result.slice(0, -1);
        setResultHistory(modifiedResultHistory);
        setUserData({email: data.data.email, skill: data.data.skill, points: data.data.points, counter: data.data.counter});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
        <div className={styles.result_history_container}>
          <div>

        <div className={styles.resultDiv}>
            {/* <h1>RESULT</h1> */}
            <h1>{userData.email}</h1>
            <h2>{userData.skill}</h2>
            <h3>
              {userData.points}/{userData.counter}
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop: 15,
              }}
              >
            </div>
          </div>
          <div>
            {resultHistory.map((result, index) => (
              <ResultHistory
              key={result.id}
              index={index}
              question={result.question}
              fake_answers={result.fake_answers}
              answer={result.answer}
              usersAnswer={result.usersAnswers}
              />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SharedPage