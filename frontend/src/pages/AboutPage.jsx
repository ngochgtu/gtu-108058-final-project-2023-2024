import React from 'react'
import { Container } from '../style/styled'
import styles from '../style/About.module.css'
import { useHeaderContext } from '../contexts/headerContexts';

const AboutPage = () => {
  const {isOpen} = useHeaderContext()
  return (
    <Container color={isOpen ? '#272727' : '#e6e6fa'}>
      <div className={styles.text}>About Page</div>
    </Container>
  );
};

export default AboutPage;
