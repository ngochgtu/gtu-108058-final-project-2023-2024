import { Container } from "react-bootstrap";
import "../../src/style/pages.styles.css";
import { useLocation } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();

  return (
    <Container>
      <div
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <h1>Here is your result</h1>
        </div>
        <div>
          <p>{location.state}</p>
        </div>
      </div>
    </Container>
  );
};

export default ResultPage;
