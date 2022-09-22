import { createContext, useState } from "react";

const PartidasContext = createContext('');

export const PartidasProvider = ({ children }) => {
    const [idPartida, setIdPartida] = useState('');

    return(
        <PartidasContext.Provider value={{ idPartida, setIdPartida}}>
            {children}
        </PartidasContext.Provider>
    )
}

export default PartidasContext;