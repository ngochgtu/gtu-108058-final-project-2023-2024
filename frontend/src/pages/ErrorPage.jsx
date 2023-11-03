import React from 'react'
import { Container } from 'react-bootstrap'

const ErrorPage = () => {
  return (
    <Container>
        <div style={{display:'flex', justifyContent: 'center',alignItems:'center', height: '80vh'}}>
            <h1>404</h1>
        </div>
    </Container>
  )
}

export default ErrorPage