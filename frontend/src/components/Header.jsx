import { Col, Container, Row } from "react-bootstrap";
import styles from "../style/app.module.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import logo from "../assets/zombie_icon.png";
import logout from "../assets/logout.png";

const Header = () => {
  return (
    <Container className="p-3">
      <Row>
        {/* <Col>
          <Card
            style={{
              width: "20rem",
              height: "2.5rem",
              alignContent: "space-between ",
            }}
          >
            <Col>
              <Card.Img
                variant="right"
                src="holder.js/100px180"
                style={{ width: "2rem", height: "1.5rem" }}
              />
            </Col>
            <Card.Body style={{ width: "20rem", height: "2rem" }}>
              <Row>
                <Card.Title style={{ fontSize: "1rem", width: "20rem" }}>
                  erekle
                </Card.Title>
                <Card.Text style={{ fontSize: "1rem", width: "20rem" }}>
                  welcome
                </Card.Text>
              </Row>
              <Col>
                <Button variant="primary">log out</Button>
              </Col>
            </Card.Body>
          </Card>
        </Col> */}
        <div className={styles.container}>
          <Col>
            <h1 className={styles.title}>Skills Verifier</h1>
          </Col>

          <div className={styles.img_container}>
            <img src={logo} className={styles.img}></img>
          </div>
          <div className={styles.content}>
            <span>welcome {localStorage.getItem("username")}</span>
          </div>
          <div className={styles.button_container}>
            <button className={styles.button}>
              <img src={logout} className={styles.img_logout}></img>
            </button>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Header;
