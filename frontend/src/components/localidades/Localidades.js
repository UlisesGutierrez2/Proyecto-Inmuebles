import React, { useState, useEffect } from "react";
import moment from "moment";
import LocalidadesBuscar from "./LocalidadesBuscar";
import ListadoLocalidades from "./ListadoLocalidades";
import LocalidadesRegistro from "./LocalidadesRegistro";
//import { articulosFamiliasMockService as articulosfamiliasService } from "../../services/articulosFamilias-mock-service";
import  {localidadesService}  from "../../services/localidades/localidades.service";
//import { articulosfamiliasService } from "../../services/articulosFamilias.service";
import modalDialogService from "../../services/localidades/ModalDialog";

function Localidades() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Nombre, setNombre] = useState("");
 // const [Activo, setActivo] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

 // const [ArticulosFamilias, setArticulosFamilias] = useState(null);
/*
  useEffect(() => {
    async function BuscarLocalidades() {
      let data = await articulosfamiliasService.Buscar();
      setArticulosFamilias(data);
    }
    BuscarLocalidades();
  }, []);

*/
  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }

    const data = await localidadesService.Buscar(Nombre, _pagina);
    setItems(data.Items);
    setRegistrosTotal(data.RegistrosTotal);

    //generar array de las páginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }


  async function BuscarPorId(item, accionABMC) {
    const data = await localidadesService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }
  

  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {

    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  function Agregar() {
    setAccionABMC("A");
    setItem({
      CodigoPostal: 0,
      Nombre_Localidad: null,
      FechaFundacion: moment(new Date()).format("YYYY-MM-DD"),
    });
  }


/*
  async function ActivarDesactivar(item) {
        modalDialogService.Confirm(
            "Esta seguro que quiere " +
            (item.Activo ? "desactivar" : "activar") +
            " el registro?",
            undefined,
            undefined,
            undefined,
            async () => {
            await articulosService.ActivarDesactivar(item);
            await Buscar();
            }
        );
  
    }
  */

  async function Grabar(item) {
    // agregar o modificar
    try
    {
      await localidadesService.Grabar(item);
    }
    catch (error)
    {
      alert(error?.response?.data?.message ?? error.toString())
      return;
    }
    await Buscar();
    Volver();
  
    setTimeout(() => {
      alert(
        "Registro " +
          (AccionABMC === "A" ? "agregado" : "modificado") +
          " correctamente."
      );
    }, 0);
  }
  

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Localidades <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC=== "L" &&<LocalidadesBuscar
        Nombre={Nombre}
        setNombre={setNombre}
//        Activo={Activo}
//        setActivo={setActivo}
        Buscar={Buscar}
        Agregar={Agregar}
        />
       }

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && <ListadoLocalidades
        {...{
          Items,
          Consultar,
          Modificar,
//          ActivarDesactivar,
          Pagina,
          RegistrosTotal,
          Paginas,
          Buscar,
        }}
      />
    }

    {   AccionABMC === "L" && Items?.length === 0 && <div className="alert alert-info mensajesAlert">
        <i className="fa fa-exclamation-sign"></i>
        No se encontraron registros...
      </div>
    }

      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && <LocalidadesRegistro
        {...{ AccionABMC, Item, Grabar, Volver }}
      />
      }
    </div>
  );
}
export { Localidades };
