import './App.css';
import React from 'react';
import Menu from './components/Menu';
import { Inicio } from './components/Inicio';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Vencimientos from './components/Vencimientos';
import {Inmuebles} from './components/inmuebles/Inmuebles'; 
import Contribuyentes from './components/Contribuyentes';
import {Localidades} from './components/localidades/Localidades'
import ModalDialog from "./components/ModalDialog"
import Login from './components/login/login';

function App() {
  return (
    <div>

      <BrowserRouter>
          <ModalDialog />
          <Menu />
          <div className="divBody">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/vencimientos" element={<Vencimientos />} />
              <Route path="/inmuebles" element={<Inmuebles />} />
              <Route path="/contribuyentes" element={<Contribuyentes />} />
              <Route path="/localidades" element={<Localidades />} />
              <Route
                path="/login/:componentFrom"
                element={
                  <Login />
                }
              />

              <Route path="*" element={<Navigate to="/inicio" replace />} />
            </Routes>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;