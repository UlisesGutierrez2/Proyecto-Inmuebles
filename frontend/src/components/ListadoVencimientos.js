import React from 'react';

const ListadoVencimientos = ({ lista }) => {
  
  console.log(lista);
  console.log(typeof lista);
  return (
    <div className="container mt-3">
      <h3>Vencimientos</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nro de cuota</th>
            <th>Año</th>
            <th>Fecha 1er Vencimiento</th>
            <th>Fecha 2do Vencimiento</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((item) => (
             <tr key={item.Nro_Cuota}>
              <td>{item.Nro_Cuota}</td>
              <td>{item.Año}</td>
              <td>{item.Fecha_1er_vencimiento}</td>
              <td>{item.Fecha_2do_vencimiento}</td>
              <td>{item.Descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoVencimientos;
