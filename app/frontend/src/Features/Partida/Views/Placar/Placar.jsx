import React from 'react';
import './placar.css';
import { Button } from 'react-bootstrap';
import {BsFillTrashFill, BsFillPencilFill} from 'react-icons/bs'
const Placar = () => {
    return (
    <div class="score">
        <div class="dateAndChamp date">
            <strong>06/09/2022</strong>
        </div>
        <div class="dateAndChamp champ">
            <strong>Inter Repúblicas</strong>
        </div>
        <div class="nameTeam team1name">
            <strong>FOG</strong> 
        </div>
        <div class="logo team1Logo">
            <img src="logo_team_default.png" width="50" height="50"/>
        </div>
        <div class="nameTeam team1Goal">
            <strong>2</strong> 
            </div>
        <div class="nameTeam versus">
            <strong>X</strong> 
        </div>
        <div class="nameTeam team2Goal">
            <strong>2</strong> 
        </div>
        <div class="logo team2Logo">
            <img src="logo_team_default.png" width="50" height="50"/>
        </div>
        <div class="nameTeam team2name">
            <strong>FOG</strong> 
            </div>
        <Button variant="outline-primary btnDelMatch" ><BsFillTrashFill/></Button>
        <Button variant="outline-primary btnEditMatch" ><BsFillPencilFill/></Button>
    </div>
    );
}

export default Placar;