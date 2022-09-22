import React ,{ useEffect, useState, useRef}from "react";
import { Button, Dropdown } from "react-bootstrap";
import useAuth from "../../../../hooks/useAuth";
import axios from "../../../../api/axios";
import useId from "../../../../hooks/useId";
import DropdownButton from 'react-bootstrap/DropdownButton';
import "./header.css"

const Header = () => {
    const { auth } = useAuth();
    const [campeonatos, setCampeonatos] = useState([])
    const {setId} = useId();
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        const getCampeonatos = async () => {
            try{
                setId(2)
                const response = await axios.get(`/championship`, {
                    headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${auth?.accessToken}`},
                    withCredentials: true
                });
                const resposta = response?.data.data;
                setCampeonatos(resposta);
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
        getCampeonatos()
    },[])

    const setNewValue = (eventKey) => {
        setId(eventKey)
    };

    return(
        <div class="row">
            <div class="col">
                <div class="titulo">
                    Partidas
                </div>
            </div>
            <div class="col">
                <Button variant="outline-primary botaoAdicionar"> + Adicionar Partida</Button>
            </div>
            <div class="col">
                <div class="campeonatos">
                        <DropdownButton
                        alignRight
                        title="Campeonato"
                        id="dropdown-menu-align-right"
                        onSelect={setNewValue}>
                            {campeonatos.map((campeonato) => (
                                <Dropdown.Item eventKey={campeonato.idCampeonato}>{campeonato.nome}</Dropdown.Item>
                            ))}
                        </DropdownButton>
                </div>
            </div>
        </div>
    )
} 
export default Header;