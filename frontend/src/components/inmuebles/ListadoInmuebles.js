import React from 'react';

const ListadoInmuebles = ({ lista }) => {
  
  console.log(lista);
  console.log(typeof lista);

  return (
    <div className="container mt-3">
      <h3>Inmuebles</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Numero_Catastral</th>
            <th>Ubicacion</th>
            <th>Zona</th>
            <th>Tipo</th>
            <th>Numero_Contribuyente</th>
            <th>FechaRegCatastro</th>
          </tr>
        </thead>
        <tbody>
          {lista.Items.map((item) => (
             <tr key={item.Numero_Catastral}>
              <td>{item.Numero_Catastral}</td>
              <td>{item.Ubicacion}</td>
              <td>{item.Zona}</td>
              <td>{item.Tipo}</td>
              <td>{item.Numero_Contribuyente}</td>
              <td>{item.FechaRegCatastro}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoInmuebles;
