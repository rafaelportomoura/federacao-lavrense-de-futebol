import React , {useState, useEffect}from 'react';
import './gridPlacar.css';
import Placar from '../Placar/Placar';
import {Button} from 'react-bootstrap';
import {BsFillTrashFill, BsFillPencilFill} from 'react-icons/bs'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from '../../../../../api/axios';
import useAuth from '../../../../../hooks/useAuth';

const GridPlacar = ({partidas}) => {

    const [id, setId] = useState(null);
    const {auth} = useAuth();
    const [errMsg, setErrMsg] = useState('');
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false)
    const [inputData, setInputData] = useState({
        idPartida: null,
        data: '',   
        idCampeonato: null,
        idTime1: null,
        idTime2: null,
    })

    const handleClose1 = () => setShowModal1(false);
    const handleShow1 = () =>  setShowModal1(true);

    const handleClose2 = () => setShowModal2(false);
    const handleShow2 = () => setShowModal2(true);

    const [campeonatos, setCampeonatos]= useState();
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
            await axios.put(`/match/${inputData.idPartida}`, {data: inputData.data, idCampeonato: inputData.idCampeonato, tipo: 'final'}, {
                headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${auth?.accessToken}`},
                withCredentials: true
            });

            await axios.patch(`/match/${inputData.idPartida}/team`,{idTime1: inputData.idTime1, idTime2: inputData.idTime2},{
                headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${auth?.accessToken}`},
                withCredentials: true
            })
            handleClose1()
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
            handleClose1()
        }
    };

    return (
        <>  
        <div class="container">
            {partidas.map(partida => (
                    <div class="row">
                        <div class="col-lg-4" >
                        </div>
                        <div class="col">
                            <Placar partida={partida}/>
                            <div class="score">
                            <Modal show={showModal1} onHide={handleClose1}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Adicionar Partida</Modal.Title>
                                </Modal.Header>
                                <Form >
                                <Modal.Body>
                                    <div class="row">
                                        <div class="col">
                                            <Form.Group >
                                                <Form.Label controlId="dataLabel" className="dataLabel" >Data</Form.Label>
                                                <Form.Control value={inputData.data.split('T')[0]} onChange={e => setInputData({...inputData, data: `${e.target.value}T00:00:00.000Z`, idPartida: partida.idPartida})} type="date" name="data" />
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
                                <Button variant="secondary" onClick={handleClose1}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={salvarPartida}>
                                    Save Changes
                                </Button>
                                </Modal.Footer>
                                </Form>
                            </Modal>
                                <Button onClick={handleShow1}variant="outline-primary btnDelMatch" ><BsFillTrashFill/></Button>
                                <Button variant="outline-primary btnEditMatch" ><BsFillPencilFill/></Button>
                            </div>
                        </div> 
                        <div class="col-lg-4">
                        </div>
                    </div>
            ))}
        </div>
        </>
    ) 
}
export default GridPlacar;