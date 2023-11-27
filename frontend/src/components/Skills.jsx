import React from 'react'

const Skills = ({skill, points}) => {
  return (
    <div style={{display:'flex', gap:'2rem'}}>
        <p>skill : {skill[0]}</p>
        <p>points : {points}</p>
    </div>
  )
}

export default Skills