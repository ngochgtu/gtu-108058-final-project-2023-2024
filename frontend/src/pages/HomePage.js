import {useEffect, useState} from "react";

const HomePage = () => {
    const [skillTypes, setSkillTypes] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/skill_types", {
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
        {skillTypes.map(skillType => {
            return <div>{skillType.name}</div>
        })}
    </div>
}

export default HomePage