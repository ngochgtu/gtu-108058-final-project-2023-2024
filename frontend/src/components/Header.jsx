import { Col, Container, Form, Row } from "react-bootstrap";
import styles from "../style/app.module.css";
import logout from "../assets/logout.png";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useHeaderContext } from "../contexts/headerContexts";
import Gravatar from "react-gravatar";
import { gravatarUrl } from "../garavatar/gravater";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";

const Header = () => {
  const navigate = useNavigate();
  const { isOpen, toggle } = useHeaderContext();

  const onLogoClick = () => {
    if (localStorage.getItem("username")) navigate("/");
  };

  const testEmail = "e.lnacain@gmail.com";

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
          {localStorage.getItem("username") ? (
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                variant="success"
                className={styles.dropdown_container}
              >
                <div className={styles.img_container}>
                  <img
                    className={styles.img}
                    src={gravatarUrl(testEmail)}
                    alt="User Avatar"
                  ></img>
                </div>
                <div className={styles.content}>
                  <span>{localStorage.getItem("username")}</span>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="1">Profile</Dropdown.Item>
                <Dropdown.Item eventKey="2">About Us</Dropdown.Item>
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
