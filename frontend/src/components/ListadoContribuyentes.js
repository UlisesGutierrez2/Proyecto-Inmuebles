import React from 'react';

const ListadoContribuyentes = ({ lista }) => {
  
  console.log(lista);
  console.log(typeof lista);

  return (
    <div className="container mt-3">
      <h3>Contribuyentes</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nro_Contribuyente</th>
            <th>Nombre</th>
            <th>Domicilio</th>
            <th>CodigoPostal</th>
            <th>Barrio</th>
            <th>FechaDeAlta</th>
          </tr>
        </thead>
        <tbody>
          {lista.Items.map((item) => (
             <tr key={item.Nro_Contribuyente}>
              <td>{item.Nro_Contribuyente}</td>
              <td>{item.Nombre}</td>
              <td>{item.Domicilio}</td>
              <td>{item.CodigoPostal}</td>
              <td>{item.Barrio}</td>
              <td>{item.FechaDeAlta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoContribuyentes;
