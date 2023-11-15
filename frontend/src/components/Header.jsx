import { Col, Container, Row } from "react-bootstrap";
import styles from "../style/app.module.css";
import logo from "../assets/zombie_icon.png";
import logout from "../assets/logout.png";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

  const onLogoClick = () =>{
    if(localStorage.getItem('username')) navigate('/home')
  }

  return (
    <Container className="p-3">
      <Row>
        <div className={styles.container}>
          <Col >
            <h1 className={styles.title} style={{cursor:'pointer'}} onClick={onLogoClick}>Skills Verifier</h1>
          </Col>
          {localStorage.getItem('username') ?
          <div style={{display:'flex', alignItems:'center'}}> 
            <div className={styles.img_container}>
              <img src={logo} alt="img" className={styles.img}></img>
            </div>
            <div className={styles.content}>
              <span>welcome {localStorage.getItem("username")}</span>
            </div>
            <div className={styles.button_container}>
              <button className={styles.button}>
                <img src={logout} alt="img" className={styles.img_logout}></img>
              </button>
            </div>
          </div>
          : ''
          }
        </div>
      </Row>
    </Container>
  );
};

export default Header;
