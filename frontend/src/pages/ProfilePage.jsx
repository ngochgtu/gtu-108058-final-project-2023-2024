import React from 'react'
import { Container } from '../style/styled'
import styles from '../style/ProfilePage.module.css'
import img from '../assets/404-error.png'
import Skills from '../components/Skills'
import { gravatarUrl } from "../garavatar/gravater";
import { useUserContext } from '../contexts/userContexts'
import { useHeaderContext } from '../contexts/headerContexts'

const ProfilePage = () => {
    
  const {userData} = useUserContext();
  const {isOpen} = useHeaderContext()


  return (
    <Container color={isOpen ? '#272727' : '#e6e6fa'} className={styles.container}>
        {userData ?
        <div className={styles.Profile}>
            <div className={styles.left_side}>
                <div className={styles.img}>
                    <h2>Profile</h2>
                    <img src={gravatarUrl(userData.email)} alt="lol" />
                </div>
                <div className={styles.desc}>
                    <p>username: {userData.username}</p>
                    <p>email: {userData.email}</p>
                </div>
                
            </div>
            <div className={styles.right_side}>
                <div className={styles.achievements}>
                    <h2>your history of achievements</h2>
                    <Skills key={0} skill={['javascript']} points={20} />
                </div>
            </div>
        </div>
        : ''}
    </Container>
  )
}

export default ProfilePage