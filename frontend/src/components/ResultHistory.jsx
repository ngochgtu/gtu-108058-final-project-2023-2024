import React from "react";
import styles from '../style/ResultComponent.module.css'

const ResultHistory = ({index, question, fake_answers, answer, usersAnswer }) => {

  const itemNumber = index + 1;

  return (
    <div className={styles.component} style={{ border: answer === usersAnswer ? '1px solid lightgreen': '1px solid red' }}>
      <h1 style={{ color: "white", fontSize: 20 }}>{itemNumber}. {question}</h1>
      {fake_answers ? (
        <ul>
          {fake_answers.map((fakeAnswer, index) => (
            <li key={index} style={{ color: "white" }}>
              {fakeAnswer}
            </li>
          ))}
        </ul>
      ) : (
        <p>user answered:</p>
      )}
      <h1 style={{ color: "white", fontSize: 15 }}>correct answer: {answer}</h1>
      <h1 style={{ color: "white", fontSize: 15 }}> you answered: {usersAnswer}</h1>
    </div>
  );
};

export default ResultHistory;
