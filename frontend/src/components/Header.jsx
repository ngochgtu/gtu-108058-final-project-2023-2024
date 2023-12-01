import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import logout from "../assets/logout.png";
import { gravatarUrl } from "../garavatar/gravater";
import styles from "../style/app.module.css";
import { useCookies } from "react-cookie";

const Header = () => {
	const navigate = useNavigate();
	const [cookies, removeCookie] = useCookies(["user"]);


	const onLogoClick = () => {
		if (cookies.user) navigate("/");
	};
	const handleLogout = () => {
		// Remove each cookie individually
		Object.keys(cookies).forEach(cookieName => {
			document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
		  });

		document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
	
		// Redirect to the login or home page after logout
		navigate("/sign-in"); // Replace with the appropriate route
	  };

	return (
		<Container className="p-3">
			<Row>
				<div className={styles.container}>
					<Col>
						<h1
							className={styles.title}
							style={{ cursor: "pointer" }}
							onClick={onLogoClick}
						>
							Skills Verifier
						</h1>
					</Col>
					{cookies.user ? 
						<Dropdown as={ButtonGroup}>
							<Dropdown.Toggle
								variant="success"
								className={styles.dropdown_container}
							>
								<div className={styles.img_container}>
									<img
										className={styles.img}
										src={gravatarUrl(cookies.user.email)}
										alt="User Avatar"
									></img>
								</div>
								<div className={styles.content}>
									<span>{cookies.user.username}</span>
								</div>
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item eventKey="1">
									<Link className={styles.links} to={"/profile"}>
										Profile
									</Link>
								</Dropdown.Item>
								<Dropdown.Item eventKey="2">
									<Link className={styles.links} to={"/about"}>
										About Us
									</Link>
								</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item eventKey="4" onClick={handleLogout}>
									<span>log out</span>
									<img
										src={logout}
										alt="img"
										className={styles.img_logout}
									></img>
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					 : ''}
					{/* <div>
						<Form>
							<Form.Check // prettier-ignore
								type="switch"
								id="custom-switch"
								label={isOpen ? "dark" : "light"}
								onChange={() => toggle((prev) => !prev)}
								value={isOpen}
								checked={isOpen}
							/>
						</Form>
					</div> */}
				</div>
				
			</Row>
		</Container>
	);
};

export default Header;
