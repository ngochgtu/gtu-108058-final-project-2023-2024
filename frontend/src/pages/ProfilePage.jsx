import React from "react";
import { Container } from "react-bootstrap";
import Skills from "../components/Skills";
import { useUserContext } from "../contexts/userContexts";
import { gravatarUrl } from "../garavatar/gravater";
import styles from "../style/ProfilePage.module.css";

const ProfilePage = () => {
	const { userData } = useUserContext();

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
	return (
		<Container className={styles.container}>
			{userData ? (
				<div className={styles.profile}>
					<div className={styles.left_side}>
						<div>
							<h2 className={styles.title}>Profile</h2>
						</div>
						<div className={styles.details}>
							<div className={styles.img}>
								<img src={gravatarUrl(userData.email)} alt="" />
							</div>
							<div className={styles.information}>
								<p>
									<strong>Username: </strong>
									{userData.username}
								</p>
								<p>
									<strong>Email: </strong>
									{userData.email}
								</p>
							</div>
						</div>
					</div>
					<div className={styles.right_side}>
						<div className={styles.achievements}>
							<h2 className={styles.title}>History</h2>
							<div className={styles.skills}>
								<Skills
									key={0}
									skill={["javascript" /*Replace this*/]}
									points={20}
								/>
							</div>
						</div>
					</div>
				</div>
			) : (
				"Error loading user profile"
			)}
		</Container>
	);
};

export default ProfilePage;
