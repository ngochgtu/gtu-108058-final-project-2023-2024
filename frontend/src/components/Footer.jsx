import React from 'react'
import { Container } from '../style/styled'
import styles from '../style/Footer.module.css'
import { useHeaderContext } from '../contexts/headerContexts'

const Footer = () => {
  const {isOpen} = useHeaderContext()
  return (
    <Container color={isOpen ? '#272727' : '#e6e6fa'}>
        <div className={styles.border}>
            footer
        </div>
    </Container>
  )
}

export default Footer