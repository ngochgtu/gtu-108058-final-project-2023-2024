import SkillCheck from "../components/SkillCheck";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

const SkillsCheckPage = () => {
    const [questions, setQuestions] = useState(null)

    const location = useLocation();

    useEffect(() => {

        if (location.state) {
            const sillIds = location.state.map(e => e.value)
            fetch(`http://localhost:3001/api/questions?skills=${sillIds}`, {
                method: "GET"
            })
                .then((response) => response.json())
                .then((data) => {
                    handleQuestions(data)
                })
                .catch((error) => console.log(error));
        }
    }, [location.state]);

    const handleQuestions = (data) => {
        console.log(data)
        if (data && Array.isArray(data)) {
            setQuestions(data)
        }
    }

    return <div>{questions ? questions.map(e => {
        return <SkillCheck key={e.id} question={e}/>
    }) : "Loading..."}</div>
}

export default SkillsCheckPage