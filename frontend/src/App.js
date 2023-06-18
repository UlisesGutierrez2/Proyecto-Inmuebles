import './App.css';
import {Menu} from './components/Menu';
import { Inicio } from './components/Inicio';

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Vencimientos from './components/Vencimientos';
import Inmuebles from './components/Inmuebles'; 
import {Localidades} from './components/localidades/Localidades'

function App() {
  return (
    <div>

      <BrowserRouter>
          <Menu />
          <div className="divBody">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/vencimientos" element={<Vencimientos />} />
              <Route path="/inmuebles" element={<Inmuebles />} />
              <Route path="/localidades" element={<Localidades />} />

              <Route path="*" element={<Navigate to="/inicio" replace />} />
            </Routes>
          </div>
        </BrowserRouter>

    
    </div>
  );
}

export default App;