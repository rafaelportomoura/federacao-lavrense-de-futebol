import React ,{ useEffect, useState, useRef}from "react";
import { Button, Dropdown } from "react-bootstrap";
import useAuth from "../../../../hooks/useAuth";
import axios from "../../../../api/axios";
import useId from "../../../../hooks/useId";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import "./header.css"

const Header = () => {
    const { auth } = useAuth();
    const [campeonatos, setCampeonatos] = useState([])
    const {setId} = useId();
    const [errMsg, setErrMsg] = useState('')
    const [showModal, setShowModal] = useState(false);
    
    const [times, setTimes] = useState();

    useEffect(() => {
        const getCampeonatos = async () => {
            try{
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

    useEffect(() => {
        const getTimes = async () => {
            try{
                const response = await axios.get(`/team`, {
                    headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${auth?.accessToken}`},
                    withCredentials: true
                });
                const resposta = response?.data.data;
                setTimes(resposta);
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
        getTimes()
    },[])

    const setNewValue = (eventKey) => {
        setId(eventKey)
    };

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return(
        <>
            <div class="row">
                <div class="col">
                    <div class="titulo">
                        Partidas
                    </div>
                </div>
                <div class="col">
                    <Button onClick={handleShow} variant="outline-primary botaoAdicionar"> + Adicionar Partida</Button>
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
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Partida</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <div class="row">
                        <div class="col">
                            <Form.Group >
                                <Form.Label className="dataLabel" >Data</Form.Label>
                                <Form.Control type="date" name="data" />
                            </Form.Group>
                        </div>
                        <div class="col">
                        <Form.Group>
                            <Form.Label className="campeonatoLabel">Campeonato</Form.Label>
                            <DropdownButton
                                alignRight
                                title="Campeonato"
                                id="dropdown-menu-align-right">
                                    {campeonatos?.map((campeonato) => (
                                        <Dropdown.Item eventKey={campeonato.idCampeonato}>{campeonato.nome}</Dropdown.Item>
                                    ))}
                            </DropdownButton>
                        </Form.Group>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <Form.Group>
                                <DropdownButton
                                    alignRight
                                    title="Time 1"
                                    id="dropdown-menu-align-right">
                                        {times?.map((time) => (
                                            <Dropdown.Item eventKey={time.idTime}>{time.nome}</Dropdown.Item>
                                        ))}
                                </DropdownButton>
                            </Form.Group>
                        </div>
                        <div class="col x">
                            X
                        </div>
                        <div class="col">
                            <Form.Group>
                                <DropdownButton
                                    alignRight
                                    title="Time 2"
                                    id="dropdown-menu-align-right">
                                        {times?.map((time) => (
                                            <Dropdown.Item eventKey={time.idTime}>{time.nome}</Dropdown.Item>
                                        ))}
                                </DropdownButton>
                            </Form.Group>
                        </div>
                    </div>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
            </>
        )
} 
export default Header;