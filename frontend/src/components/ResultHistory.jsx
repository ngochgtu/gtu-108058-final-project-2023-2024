import React from 'react'

const ResultHistory = (question, fake_answers,answer, usersAnswer) => {
  return (
    <div>
        <h1>{question}</h1>
        <h1>{fake_answers}</h1>
        <h1>{answer}</h1>
        <h1>{usersAnswer}</h1>
    </div>
  )
}

export default ResultHistory