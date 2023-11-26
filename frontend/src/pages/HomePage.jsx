import { useEffect, useState } from "react";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import "../../src/style/pages.styles.css";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [difficulty, setDifficulty] = useState([]);

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
    if (selectedSkills.length === 0) {
      alert("select skill first");
    } else {
      navigate("/check", { state: selectedSkills , difficulty: difficulty});
    }
  };

  const handleSkillChange = (e) => {
    setSelectedSkills(e);
  };
  const handleDifficultyChange = (e) => {
    setDifficulty(e);
  };

  console.log(skills)
  return (
    <Container className="p-3">
      <form onSubmit={handleStartClick}>
        <Row>
          <h2 className='header' style={{color: 'white', display:"flex", justifyContent:'center'}}>Select Skills</h2>
        </Row>
        <div style={{display:'flex',justifyContent:'center' }}>
          <Row style={{ marginTop: 10, marginBottom: 10 , width: 600}}>
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
          <Row style={{ marginTop: 10, marginBottom: 10 }}>
            <Select
              options={[{label: 'easy'},{label:'medium'}, {label:'hard'}]}
              isMulti
              name="colors"
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select Difficulty"
              onChange={handleDifficultyChange}
              />
          </Row>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
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
