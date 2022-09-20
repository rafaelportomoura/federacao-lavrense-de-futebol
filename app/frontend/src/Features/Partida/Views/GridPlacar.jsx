import React from 'react';
import './gridPlacar.css';
import Placar from './Placar/Placar';


const GridPlacar = () => {
    return (
        <div class="container">
        <div class="row">
            <div class="col-lg-4" >

            </div>
            <div class="col">
                <Placar/>
            </div>
            <div class="col-lg-4">
            </div>
        </div>
    </div>
    ) 
}
export default GridPlacar;