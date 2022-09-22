import { createContext, useState } from "react";

const ChampionshipContext = createContext('');

export const ChampionshipProvider = ({ children }) => {
    const [id, setId] = useState('');

    return(
        <ChampionshipContext.Provider value={{ id, setId}}>
            {children}
        </ChampionshipContext.Provider>
    )
}

export default ChampionshipContext;