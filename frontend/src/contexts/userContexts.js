
import { createContext, useContext, useMemo, useState } from "react";
import useSessionStorage from "../hooks/useSessionStorage";

const UserContexts = createContext(null)

const UserContextProvider = ({children}) => {
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [difficulty, setDifficulty] = useState([{label: 'easy'}]);
    const [difficultyLevel] = useState([{label: 'easy'},{label:'medium'}, {label:'hard'}])
    const [userData, setUserData] = useState(null);
    const [id, setId]= useSessionStorage('counter', '0')

    
    const contextValue = useMemo(()=> ({
        selectedSkills, 
        setSelectedSkills, 
        difficulty, 
        setDifficulty,
        difficultyLevel,
        setUserData,
        userData,
        id,
        setId
    }), [selectedSkills, difficultyLevel, difficulty, userData, id, setId])
    
    return(
        <UserContexts.Provider value={contextValue}>
            {children}
        </UserContexts.Provider>
    )
}

export const useUserContext = () => {
    const contextValue = useContext(UserContexts)
    if(contextValue === null){
        throw new Error("useUserContext must be used within a UserContextProvider")
    }
    return contextValue
}

export default UserContextProvider