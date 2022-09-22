import React ,{ useEffect, useState, useRef}from "react";
import { Button, Dropdown } from "react-bootstrap";
import useAuth from "../../../../hooks/useAuth";
import useIdPartida from "../../../../hooks/useIdPartida";
import axios from "../../../../api/axios";
import useId from "../../../../hooks/useId";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import "./header.css"

const Header = () => {
    const { auth } = useAuth();
    const { idPartida, setIdPartida } = useIdPartida();
    const [campeonatos, setCampeonatos] = useState([])
    const { setId} = useId();
    const [errMsg, setErrMsg] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [inputData, setInputData] = useState({
        data: '',
        idCampeonato: null,
        idTime1: null,
        idTime2: null,
    })
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

    const salvarPartida = async () => {
        try{
            console.log('oie')
            await axios.post(`/match`, {data: inputData.data, idCampeonato: inputData.idCampeonato, tipo: 'final'}, {
                headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${auth?.accessToken}`},
                withCredentials: true
            });
            var idPart = idPartida === null ? 1 : idPartida + 1;
            setIdPartida(idPart)
            await axios.patch(`/match/${idPart}/team`,{idTime1: inputData.idTime1, idTime2: inputData.idTime2},{
                headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${auth?.accessToken}`},
                withCredentials: true
            })
            handleClose()
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
            handleClose()
        }
    };

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
                <Form >
                <Modal.Body>
                    <div class="row">
                        <div class="col">
                            <Form.Group >
                                <Form.Label controlId="dataLabel" className="dataLabel" >Data</Form.Label>
                                <Form.Control value={inputData.data.split('T')[0]} onChange={e => setInputData({...inputData, data: `${e.target.value}T00:00:00.000Z`})} type="date" name="data" />
                            </Form.Group>
                        </div>
                        <div class="col">
                        <Form.Group>
                            <Form.Label className="campeonatoLabel">Campeonato</Form.Label>
                            <Form.Control as="select" name="campeonato" value={inputData.idCampeonato} onChange={e => setInputData({...inputData, idCampeonato: e.target.value})}>
                                    {campeonatos?.map((campeonato) => (
                                        <option value={campeonato.idCampeonato}>{campeonato.nome}</option>
                                    ))}
                            </Form.Control>
                        </Form.Group>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <Form.Group>
                            <Form.Control as="select" name="time 1" value={inputData.idTime1} onChange={e => setInputData({...inputData, idTime1: e.target.value})}>
                                        {times?.map((time) => (
                                            <option value={time.idTime}>{time.nome}</option>
                                        ))}
                                </Form.Control>
                            </Form.Group>
                        </div>
                        <div class="col x">
                            X
                        </div>
                        <div class="col">
                            <Form.Group>
                            <Form.Control as="select" name="time 2" value={inputData.idTime2} onChange={e => setInputData({...inputData, idTime2: e.target.value})}>
                                        {times?.map((time) => (
                                            <option value={time.idTime}>{time.nome}</option>
                                        ))}
                                </Form.Control>
                            </Form.Group>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={salvarPartida}>
                    Save Changes
                </Button>
                </Modal.Footer>
                </Form>
            </Modal>
            </>
        )
} 
export default Header;