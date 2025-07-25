import { createContext, useState } from "react"

export const SupportContext = createContext();

export const SupportProvider = ({children}) => {

    const [supportData,setSupportData] = useState('');

    return(
        <SupportContext.Provider value={{supportData,setSupportData}}>
            {children}
        </SupportContext.Provider>
    )
}