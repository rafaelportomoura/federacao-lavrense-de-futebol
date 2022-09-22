import React, { useEffect, useState } from "react";
import Header from "./Header/Header"
import GridPlacar from "./Placares/GridPlacar/GridPlacar";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import useId from "../../../hooks/useId";

const PartidaPage = () => {
    const [partidas, setPartidas] = useState([]);
    const [err, setErrMsg] = useState([]);
    const { auth } = useAuth();
    const { id } = useId();


    useEffect(() => {
        const getPartidas = async () => {
            try{
                const response = await axios.get(`/match/championship/${id}`, {
                    headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${auth?.accessToken}`},
                    withCredentials: true
                });
                const resposta = response?.data.data;
                setPartidas(resposta);
            } catch (err){
                if(!err?.response){
                    setErrMsg('No server response');
                } else if (err.response?.status === 400){
                    setErrMsg('bad request');
                } else if (err.response?.status === 401){
                    setErrMsg('unauthorized')
                } else {
                    setErrMsg('login failed')
                }
            }
        }
        getPartidas()
    },[id])



    return (
        <>
            <Header/>
            <GridPlacar partidas={partidas}/>
        </>
    )
}

export default PartidaPage;