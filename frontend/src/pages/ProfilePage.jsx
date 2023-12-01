import React from "react";
import Skills from "../components/Skills";
import { gravatarUrl } from "../garavatar/gravater";
import styles from "../style/ProfilePage.module.css";
import { Container } from "../style/styled";
import { useCookies } from "react-cookie";

const ProfilePage = () => {
	
	const [cookies, setCookie] = useCookies(["user"]);

	return (
		<Container className={styles.container}>
			{cookies.user ? 
				<div className={styles.profile}>
					<div className={styles.left_side}>
						<div>
							<h2 className={styles.title}>Profile</h2>
						</div>
						<div className={styles.details}>
							<div className={styles.img}>
								<img src={gravatarUrl(cookies.user.email)} alt="" />
							</div>
							<div className={styles.information}>
								<p>
									<strong>Username: </strong>
									{cookies.user.username}
								</p>
								<p>
									<strong>Email: </strong>
									{cookies.user.email}
								</p>
							</div>
						</div>
					</div>
					<div className={styles.right_side}>
						<div className={styles.achievements}>
							<h2 className={styles.title}>Stats</h2>
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
			 : 
				"Error loading user profile"
			}
		</Container>
	);
};

export default ProfilePage;
