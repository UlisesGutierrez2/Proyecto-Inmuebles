import axios from "axios";

const urlResource = "http://localhost:4000/api/localidades";

async function Buscar(Nombre_Localidad, Pagina) {
  const resp = await axios.get(urlResource, {
    params: { Nombre_Localidad, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.CodigoPostal);
  return resp.data;
}
/*
async function ActivarDesactivar(item) {
  await axios.delete(urlResource + "/" + item.CodigoPostal);
}
*/
async function Grabar(item) {
  if (item.CodigoPostal === 0) {
    await axios.post(urlResource, item);
  } else {
    await axios.put(urlResource + "/" + item.CodigoPostal, item);
  }
}

export const localidadesService = {
  Buscar,BuscarPorId,Grabar
};
