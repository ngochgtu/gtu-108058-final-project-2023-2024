import {Col, Container, Row} from "react-bootstrap";
import styles from "./Header.css"

const Header = () => {
    return <Container className="p-3">
        <Row>
            <div className={styles.container}>
                <Col>
                    <h1>Skills Verifier</h1>
                </Col>
                <div className={styles.img_container}>image</div>
                <div className={styles.content}>
                    <span>erekle</span>
                    <span>welcome</span>
                </div>
                <div className={styles.button_container}>
                    <button className={styles.button}>log out</button>
                </div>
            </div>
        </Row>
    </Container>
};

export default Header