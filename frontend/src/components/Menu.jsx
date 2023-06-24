import React, { useEffect, useState } from "react";
import { NavLink} from "react-router-dom";
import AuthService from "../services/auth.service";


function Menu() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(
    AuthService.getUsuarioLogueado()
  );


  function CambioUsuarioLogueado(_usuarioLogueado) {
    setUsuarioLogueado(_usuarioLogueado);
  }


  useEffect(() => {
    AuthService.subscribeUsuarioLogueado(CambioUsuarioLogueado);
    return () => {
      AuthService.subscribeUsuarioLogueado(null);
    }
  }, []);


  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <div className="container-fluid">
        <a className="navbar-brand" href="#!">
          <i className="fa fa-industry"></i>
          &nbsp;<i>TPI 2</i>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/inicio">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/vencimientos">
                Vencimientos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/inmuebles">
                Inmuebles
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contribuyentes">
                Contribuyentes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/localidades">
                Localidades
              </NavLink>
            </li>
          </ul>


            <ul className="navbar-nav ms-auto">
              {usuarioLogueado && (
                <li className="nav-item">
                  <a className="nav-link" href="#!">Bienvenido: {usuarioLogueado}</a>
                </li>
              )}
              <li className="nav-item">
                <NavLink className="nav-link" to="/login/Inicio">
                  <span
                    className={
                      usuarioLogueado ? "text-warning" : "text-success"
                    }
                  >
                  </span>
                  {usuarioLogueado ? " Logout" : " Login"}
                </NavLink>
              </li>
            </ul>
        </div>
      </div>
    </nav>
  );
}


export default Menu;