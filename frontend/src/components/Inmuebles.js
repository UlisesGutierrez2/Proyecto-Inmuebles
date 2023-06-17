import React, {  useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import ListadoInmuebles from './ListadoInmuebles'

const Inmuebles = () => {
  const { register, handleSubmit } = useForm();
  
  const [lista, setLista] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await axios.get('http://localhost:4000/api/inmuebles', {
        params: data
      });
      
      console.log(response.data)

      setLista(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
     <h1>Inmuebles</h1>
     <hr />
      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Ubicacion:</label>
              <input type="text" className="form-control" {...register('Ubicacion')} />
            </div>
            <button type="submit" className="btn btn-primary">Buscar</button>
          </form>
        </div>
      </div>
      {lista && <ListadoInmuebles lista={lista} />}
    </div>
  );
};

export default Inmuebles;
