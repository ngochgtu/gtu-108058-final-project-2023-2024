import { Col, Container, Form, Row } from "react-bootstrap";
import styles from "../style/app.module.css";
import logout from "../assets/logout.png";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useHeaderContext } from "../contexts/headerContexts";
import { gravatarUrl } from "../garavatar/gravater";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { useUserContext } from "../contexts/userContexts";

const Header = () => {
	const navigate = useNavigate();
	const { isOpen, toggle } = useHeaderContext();
	const { userData } = useUserContext();

	const onLogoClick = () => {
		if (localStorage.getItem("username")) navigate("/");
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
					{userData ? (
						<Dropdown as={ButtonGroup}>
							<Dropdown.Toggle
								variant="success"
								className={styles.dropdown_container}
							>
								<div className={styles.img_container}>
									<img
										className={styles.img}
										src={gravatarUrl(userData.email)}
										alt="User Avatar"
									></img>
								</div>
								<div className={styles.content}>
									<span>{userData.username}</span>
								</div>
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item eventKey="1">
									<Link className={styles.links} to={"/profile"}>
										Profile
									</Link>
								</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item eventKey="2">
									<Link className={styles.links} to={"/about"}>
										About Us
									</Link>
								</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item eventKey="3">Theme</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item eventKey="4">
									<span>log out</span>
									<img
										src={logout}
										alt="img"
										className={styles.img_logout}
									></img>
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					) : (
						""
					)}

					<div>
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
					</div>
				</div>
			</Row>
		</Container>
	);
};

export default Header;
