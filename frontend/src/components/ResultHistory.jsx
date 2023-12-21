import React from "react";

const ResultHistory = ({ question, fake_answers, answer, usersAnswer }) => {
  return (
    <div>
      <h1 style={{ color: "white", fontSize: 20 }}>{question}</h1>
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
