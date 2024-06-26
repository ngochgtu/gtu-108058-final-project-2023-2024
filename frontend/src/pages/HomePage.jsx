import {getSkills} from "../api/ServerApi";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import "../../src/style/pages.styles.css";

import {Col, Row} from "react-bootstrap";
import {Container} from "../style/styled";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../contexts/userContexts";
import {useHeaderContext} from "../contexts/headerContexts";
import styles from "../../src/style/Home.module.css";
import {useQuery} from "@tanstack/react-query";

const HomePage = () => {
    // const [skills, setSkills] = useState([]);
    const {
        selectedSkills,
        setSelectedSkills,
        difficultyLevel,
        difficulty,
        setDifficulty,
        id,
    } = useUserContext();

    const {isOpen} = useHeaderContext();
    const navigate = useNavigate();

    const {isLoading, error, data} = useQuery({queryKey: ['skills'], queryFn: getSkills})
    if (isLoading) return 'Loading...';
    if (error) return 'An error has occurred: ' + error.message;

    const handleStartClick = (e) => {
        e.preventDefault();
        if (selectedSkills.length === 0) return alert("select skill first");
        if (difficulty.length === 0) return alert("select difficulty first");
        navigate(`/check/${id}`);
    };

    const handleSkillChange = (e) => {
        setSelectedSkills(e);
    };
    const handleDifficultyChange = (e) => {
        setDifficulty(e);
    };

    return (
        <Container className="p-3" color={isOpen ? "#272727" : "#e6e6fa"}>
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
                <div
                    className={styles.home_page_container}
                    style={{display: "flex", justifyContent: "center"}}
                >
                    <Row>
                        <Select
                            options={data.map(e => {
                                return {value: e._id, label: e.name}
                            })}
                            isMulti
                            name="colors"
                            className={styles.multi_select_skill}
                            classNamePrefix="select"
                            placeholder="Select Skills"
                            onChange={handleSkillChange}
                        />
                    </Row>
                    <Row>
                        <Select
                            options={difficultyLevel}
                            isMulti
                            name="colors"
                            className={styles.multi_select_difficulty}
                            classNamePrefix="select"
                            placeholder="Select Difficulty"
                            onChange={handleDifficultyChange}
                        />
                    </Row>
                </div>
                <div style={{display: "flex", justifyContent: "center", margin: 10}}>
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
