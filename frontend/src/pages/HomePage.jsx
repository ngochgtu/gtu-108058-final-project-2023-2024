import { useEffect, useState } from "react";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import "../../src/style/pages.styles.css";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/skills");
        const json = await response.json();

        if (json && Array.isArray(json)) {
          setSkills(
            json.map((e) => ({ value: e._id, label: e.name }))
          );
        } else {
          setSkills([{ value: "empty", label: response.message }]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleStartClick = (e) => {
    e.preventDefault();
    if (selectedSkills.length === 0) {
      alert("Select a skill first");
    } else {
      navigate("/check", { state: selectedSkills });
    }
  };

  const handleSkillChange = (e) => {
    setSelectedSkills(e);
  };

  return (
    <Container className="p-3">
      <form onSubmit={handleStartClick}>
        <h2 className="header">
          <Select
            options={skills}
            isMulti
            name="colors"
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleSkillChange}
            styles={{
              control: (base) => ({
                ...base,
                width: "300px", // Adjust the width as needed
              }),
            }}
          />
        </h2>

        <Row style={{ marginTop: 10, marginBottom: 10 }}>
          {/* You can choose to keep or remove this Select component outside the header */}
        </Row>

        <Row>
          <Col>
            <Button variant="primary" type="submit">
              Start
            </Button>
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default HomePage;

