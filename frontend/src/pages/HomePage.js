import {useEffect, useState} from "react";

const HomePage = () => {
    const [skillTypes, setSkillTypes] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/skills", {
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {
                setSkillTypes(data);
            })
            .catch((error) => console.log(error));
    }, []);

    return <div>
        <h1>Home Page</h1>
        <div>
            <label htmlFor="skills">Choose a skill:</label>
            <select name="skills">
                <option value=""></option>
                {skillTypes.map(skillType => <option value={skillType.name}>{skillType.name}</option>)}
            </select>
        </div>
        <button>Start</button>
    </div>
}

export default HomePage