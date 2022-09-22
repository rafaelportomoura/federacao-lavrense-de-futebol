import { useContext } from "react";
import PartidasContext from "../context/PartidasProvider";

const useIdPartida = () => {
    return useContext(PartidasContext);
}

export default useIdPartida;