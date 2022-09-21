import './App.css';
import { Route, Routes } from 'react-router-dom';
import GridPlacar from './Features/Partida/Views/GridPlacar';
import Login from './Modules/Auth/Login/Login';
import Layout from './Modules/Layout/Layout';
import RequireAuth from './Modules/Auth/RequireAuth';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth/>}>
      <Route path="/" element={<Layout/>} >
          <Route path="placar" element={<GridPlacar/>}/>
        </Route>
      </Route>
    </Routes>
  );
  
}

export default App;
