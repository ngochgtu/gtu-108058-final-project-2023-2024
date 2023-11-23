import { createContext, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const HeaderContexts = createContext(null)

const HeaderContextProvider = ({children}) => {
    const [isOpen = true, toggle] = useLocalStorage("tab", true);
    
    const contextValue = useMemo(()=> ({
        isOpen,
        toggle
    }), [isOpen,toggle])
    
    return(
        <HeaderContexts.Provider value={contextValue}>
            {children}
        </HeaderContexts.Provider>
    )
}

export const useHeaderContext = () => {
    const contextValue = useContext(HeaderContexts)
    if(contextValue === null){
        throw new Error("useHeaderContext must be used within a HeaderContextProvider")
    }
    return contextValue
}

export default HeaderContextProvider