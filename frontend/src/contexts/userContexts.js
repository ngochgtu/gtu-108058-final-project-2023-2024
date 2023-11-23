import { createContext, useContext, useMemo } from "react";

const UserContexts = createContext(null)

const UserContextProvider = ({children}) => {

    
    const contextValue = useMemo(()=> ({
        
    }), [])
    
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