import './App.css';
import { Route, Routes } from 'react-router-dom';
import PartidaPage from './Features/Partida/Views/PartidaPage';
import Login from './Modules/Auth/Login/Login';
import Layout from './Modules/Layout/Layout';
import RequireAuth from './Modules/Auth/RequireAuth';
import { ChampionshipProvider } from './context/ChampionshipProvider';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth/>}>
      <Route path="/" element={<Layout/>} >
          <Route path="partida" element={<PartidaPage/>}/>
      </Route>
      </Route>
    </Routes>
  );
  
}

export default App;
