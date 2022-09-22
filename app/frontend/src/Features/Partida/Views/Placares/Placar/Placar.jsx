import React from 'react';
import './placar.css';
const Placar = ({partida}) => {
    return (
    <div class="score">
        <div class="dateAndChamp date">
            <strong>{partida.data}</strong>
        </div>
        <div class="dateAndChamp champ">
            <strong>{partida.campeonato?.nome}</strong>
        </div>
        <div class="nameTeam team1name">
            <strong>{partida.time1?.nome}</strong> 
        </div>
        {/* <div class="logo team1Logo">
            <img src="logo_team_default.png" width="50" height="50"/>
        </div> */}
        <div class="nameTeam team1Goal">
            <strong>{partida.time2?.gols === null ? partida.time2?.gols : '0' }</strong> 
            </div>
        <div class="nameTeam versus">
            <strong>X</strong> 
        </div>
        <div class="nameTeam team2Goal">
            <strong>{ partida.time2?.gols === null ? partida.time2?.gols : '0' }</strong> 
        </div>
        {/* <div class="logo team2Logo">
            <img src="logo_team_default.png" width="50" height="50"/>
        </div> */}
        <div class="nameTeam team2name">
            <strong>{partida.time2?.nome}</strong> 
            </div>
    </div>
    );
}

export default Placar;