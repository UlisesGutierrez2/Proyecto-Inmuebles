// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/TPI.db");
  //await db.open(process.env.base);

  let existe = false;
  let res = null;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'localidades'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table localidades( 
              CodigoPostal INTEGER PRIMARY KEY AUTOINCREMENT
            , Nombre_Localidad text NOT NULL UNIQUE
            , FechaFundacion text NOT NULL UNIQUE);`
    );

    console.log("tabla localidades creada!");
    await db.run(
      `insert into localidades values	
      (1,'Cordoba','02/06/1460'),
      (2,'La Calera','15/11/1500'),
      (3,'Carlos Paz','19/08/1463'),
      (4,'La Falda','30/07/1560'),
      (5,'Embalse','24/10/1680'),
      (6,'Villa General Belgrano','25/09/1670'),
      (7,'Rio Cuarto','04/08/1570'),
      (8,'San Francisco','26/03/1620'),
      (9,'Río Seco','19/12/1460'),
      (10,'Villa Dolores','14/29/1620');`
    );
  }

  existe = false;
  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'contribuyentes'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table contribuyentes( 
              Nro_Contribuyente INTEGER PRIMARY KEY AUTOINCREMENT
            , Nombre text NOT NULL
            , Domicilio text
            , CodigoPostal integer
            , Barrio text
            , FechaDeAlta text
            , FOREIGN KEY (CodigoPostal) REFERENCES localidades(CodigoPostal)
            );`
    );
    console.log("tabla contribuyentes creada!");

    await db.run(
      `insert into contribuyentes values
      (1, 'Juan Pérez', 'Calle 123', 1, 'Barrio A', '2022-01-01'),
      (2, 'María Rodríguez', 'Avenida 456', 2, 'Barrio B', '2022-02-02'),
      (3, 'Carlos Gómez', 'Calle Principal 789', 3, 'Barrio C', '2022-03-03'),
      (4, 'Laura Fernández', 'Calle Secundaria 456', 4, 'Barrio D', '2022-04-04'),
      (5, 'Pedro Sánchez', 'Avenida Central 789', 5, 'Barrio E', '2022-05-05'),
      (6, 'Ana López', 'Calle Central 111', 6, 'Barrio A', '2022-06-06'),
      (7, 'Luisa Torres', 'Avenida Principal 222', 7, 'Barrio B', '2022-07-07'),
      (8, 'Roberto Medina', 'Calle Central 333', 8, 'Barrio C', '2022-08-08'),
      (9, 'Lucía Herrera', 'Avenida 444', 9, 'Barrio D', '2022-09-09'),
      (10, 'Javier García', 'Calle Principal 555', 10, 'Barrio E', '2022-10-10')
      ;`
    );
  }

  existe = false;
  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'inmuebles'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table inmuebles( 
              Numero_Catastral INTEGER PRIMARY KEY AUTOINCREMENT
            , Ubicacion text NOT NULL
            , Zona text
            , Tipo text
            , Numero_Contribuyente integer
            , FechaRegCatastro text
            , FOREIGN KEY (Numero_Contribuyente) REFERENCES contribuyentes(Nro_Contribuyente)
            );`
    );
    console.log("tabla inmuebles creada!");

    await db.run(
      `insert into inmuebles values
      (1, 'Calle Gran Vía Ciudad A', 'Residencial', 'Casa', 1, '2023-05-15'),
      (2, 'Avenida Juarez Ciudad B', 'Comercial', 'Local comercial', 2, '2023-04-10'),
      (3, 'Calle Reforma Ciudad A', 'Residencial', 'Apartamento', 3, '2023-06-25'),
      (4, 'Avenida Independencia Ciudad C', 'Industrial', 'Bodega', 4, '2023-03-05'),
      (5, 'Calle Hidalgo Ciudad B', 'Residencial', 'Casa', 5, '2023-02-12'),
      (6, 'Avenida Paseo de la Reforma Ciudad A', 'Comercial', 'Oficina', 6, '2023-07-20'),
      (7, 'Calle Madero Ciudad C', 'Residencial', 'Apartamento', 7, '2023-09-08'),
      (8, 'Avenida Insurgentes Ciudad B', 'Comercial', 'Local comercial', 8, '2023-04-30'),
      (9, 'Calle Serapio Rendón Ciudad A', 'Residencial', 'Casa', 9, '2023-03-17'),
      (10, 'Avenida Revolución Ciudad C', 'Industrial', 'Bodega', 10, '2023-06-05');`
    );
  }

  existe = false;
  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'vencimientos'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table vencimientos( 
              Nro_Cuota INTEGER PRIMARY KEY AUTOINCREMENT
            , Año text NOT NULL
            , Fecha_1er_vencimiento text
            , Fecha_2do_vencimiento text
            , Descripcion text
            );`
    );
    console.log("tabla vencimientos creada!");

    await db.run(
      `insert into vencimientos values
      (1, '2020', '2023-06-01', '2023-06-15', 'Descripción 1'),
      (2, '2022', '2023-07-01', '2023-07-15', 'Descripción 2'),
      (3, '2021', '2023-08-01', '2023-08-15', 'Descripción 3'),
      (4, '2022', '2023-09-01', '2023-09-15', 'Descripción 4'),
      (5, '2023', '2023-10-01', '2023-10-15', 'Descripción 5'),
      (6, '2022', '2024-01-01', '2024-01-15', 'Descripción 6'),
      (7, '2021', '2024-02-01', '2024-02-15', 'Descripción 7'),
      (8, '2020', '2024-03-01', '2024-03-15', 'Descripción 8'),
      (9, '2020', '2024-04-01', '2024-04-15', 'Descripción 9'),
      (10, '2022', '2024-05-01', '2024-05-15', 'Descripción 10');`
    );
  }

  // cerrar la base
  db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;