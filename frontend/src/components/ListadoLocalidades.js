import React from 'react';

const ListadoLocalidades = ({ lista }) => {
  
  console.log(lista);
  console.log(typeof lista);

  return (
    <div className="container mt-3">
      <h3>Localidades</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>CodigoPostal</th>
            <th>Nombre</th>
            <th>FechaFundacion</th>
          </tr>
        </thead>
        <tbody>
          {lista.Items.map((item) => (
             <tr key={item.CodigoPostal}>
              <td>{item.CodigoPostal}</td>
              <td>{item.Nombre_Localidad}</td>
              <td>{item.FechaFundacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoLocalidades;
