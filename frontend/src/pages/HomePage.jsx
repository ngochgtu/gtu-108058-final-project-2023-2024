import { useEffect, useState } from "react";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import "../../src/style/pages.styles.css";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/userContexts";

const HomePage = () => {
  const [skills, setSkills] = useState([]);
  const {
    selectedSkills,
    setSelectedSkills,
    difficultyLevel,
    difficulty,
    setDifficulty,
  } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://localhost:3001/api/skills");
      const json = await data.json();
      if (json && Array.isArray(json)) {
        setSkills(
          json.map((e) => {
            return { value: e._id, label: e.name };
          })
        );
      } else {
        setSkills([{ value: "empty", label: data["message"] }]);
      }
    };
    fetchData().catch(console.error);
  }, []);

  const handleStartClick = (e) => {
    e.preventDefault();
    if (selectedSkills.length === 0) return alert("select skill first");
    if (difficulty.length === 0) return alert("select difficulty first");
    navigate("/check");
  };

  const handleSkillChange = (e) => {
    setSelectedSkills(e);
  };
  const handleDifficultyChange = (e) => {
    setDifficulty(e);
  };

  return (
    <Container className="p-3">
      <form onSubmit={handleStartClick}>
        <Row>
          <h2
            className="header"
            style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Select Skills
          </h2>
        </Row>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Row
            style={{
              marginTop: 10,
              marginBottom: 10,
              width: 600,
              fontWeight: "bold",
            }}
          >
            <Select
              options={skills}
              isMulti
              name="colors"
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select Skills"
              onChange={handleSkillChange}
            />
          </Row>
          <Row style={{ marginTop: 10, marginBottom: 10, fontWeight: "bold" }}>
            <Select
              options={difficultyLevel}
              isMulti
              name="colors"
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select Difficulty"
              onChange={handleDifficultyChange}
            />
          </Row>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Row>
            <Col>
              <Button variant="primary" type="submit">
                Start
              </Button>
            </Col>
          </Row>
        </div>
      </form>
    </Container>
  );
};

export default HomePage;
