import { useContext } from "react";
import ChampionshipContext from "../context/ChampionshipProvider";

const useId = () => {
    return useContext(ChampionshipContext);
}

export default useId;