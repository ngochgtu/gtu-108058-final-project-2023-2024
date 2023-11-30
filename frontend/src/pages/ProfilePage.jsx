import React from "react";
import { Container } from "react-bootstrap";
import styles from "../style/ProfilePage.module.css";
import img from "../assets/404-error.png";
import Skills from "../components/Skills";
import { gravatarUrl } from "../garavatar/gravater";
import { useUserContext } from "../contexts/userContexts";

const ProfilePage = () => {
	const { userData } = useUserContext();

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
