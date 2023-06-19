import axios from "axios";

const urlResource = "http://localhost:4000/api/localidades";

async function Buscar(Nombre, Activo, Pagina) {
  const resp = await axios.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.CodigoPostal);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await axios.delete(urlResource + "/" + item.CodigoPostal);
}

async function Grabar(item) {
  if (item.CodigoPostal === 0) {
    await axios.post(urlResource, item);
  } else {
    await axios.post(urlResource, item);
  }
}

export const localidadesService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
