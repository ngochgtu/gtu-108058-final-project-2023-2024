import React, { useEffect, useState } from 'react'
import styles from '../style/Shared.module.css'
import ResultHistory from '../components/ResultHistory'
import { BASE_PATH } from '../api/ServerApi'
import { useParams } from 'react-router-dom'

const SharedPage = () => {

    
  const [resultHistory, setResultHistory] = useState([]);

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
        setResultHistory(data.data.saved_result);
        console.log(data.data.saved_result)
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
    </div>
  )
}

export default SharedPage