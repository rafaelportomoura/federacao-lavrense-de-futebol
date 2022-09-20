import './App.css';
import FLFNavBar from './Modules/FLFNavBar/FLFNavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GridPlacar from './Features/Partida/Views/GridPlacar';
import Login from './Modules/Auth/Login/Login';

function App() {
  return (
  <>
    <BrowserRouter>
      {/* <FLFNavBar/> */}
      <Login/>
      {/* <GridPlacar/> */}
      <Routes>
        <Route path="/login">
          {/* <Manatee /> */}
        </Route>
        <Route path="/campeonato">

          {/* <Narwhal /> */}
        </Route>
        <Route exact path="/partida">
          {/* <Placar/> */}
        </Route>
        <Route path="/time">
          {/* <Whale /> */}
        </Route>
        <Route path="/alterar-senha">
          {/* <AlterarSenha/> */}
        </Route>
        <Route path="/alterar-email">
          {/* <AlterarEmail/> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
