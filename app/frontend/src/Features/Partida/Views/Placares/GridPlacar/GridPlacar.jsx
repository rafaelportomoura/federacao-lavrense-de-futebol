import React from 'react';
import './gridPlacar.css';
import Placar from '../Placar/Placar';
import {Button} from 'react-bootstrap';
import {BsFillTrashFill, BsFillPencilFill} from 'react-icons/bs'
// import { useState } from 'react';


const GridPlacar = ({partidas}) => {
    return (
        <div class="container">
            {partidas.map(partida => (
                    <div class="row">
                        <div class="col-lg-4" >
                        </div>
                        <div class="col">
                            <Placar partida={partida}/>
                            <div class="score">
                                <Button variant="outline-primary btnDelMatch" ><BsFillTrashFill/></Button>
                                <Button variant="outline-primary btnEditMatch" ><BsFillPencilFill/></Button>
                            </div>
                        </div> 
                        <div class="col-lg-4">
                        </div>
                    </div>
            ))}
        </div>
    ) 
}
export default GridPlacar;