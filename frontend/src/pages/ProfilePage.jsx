import React, { useEffect, useState } from "react";
import Skills from "../components/Skills";
import { gravatarUrl } from "../garavatar/gravater";
import styles from "../style/ProfilePage.module.css";
import { Container } from "../style/styled";
import { useCookies } from "react-cookie";
import { BASE_PATH } from "../api/ServerApi";
import { MagnifyingGlass } from "react-loader-spinner";

const ProfilePage = () => {

	const [cookies, setCookie] = useCookies(["user"]);
	const [stats, setStats] = useState(null)

	useEffect(() => {
		fetch(`${BASE_PATH}/users/UsersInfo`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: cookies.user.email,
			})
		})
			.then((response) => response.json())
			.then((data) => {
				setStats(data)
			})
			.catch((error) => console.log(error));
	},[])

	
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
								{ stats ? stats.map((stat) => (
									<Skills
										key={stat.id}
										skill={stat.skill}
										points={stat.points}
									/>
								)) : 
								<div style={{display: 'flex', justifyContent:"center", alignItems:'center'}}>
								<MagnifyingGlass
								visible={true}
								height="80"
								width="80"
								ariaLabel="MagnifyingGlass-loading"
								wrapperStyle={{}}
								wrapperClass="MagnifyingGlass-wrapper"
								glassColor = '#c0efff'
								color = '#e15b64'
								  />
								</div>
							}
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
