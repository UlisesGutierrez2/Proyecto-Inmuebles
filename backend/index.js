const express = require("express");

//creamos el servidor
const app = express();

// Invocamos la creacion de Base de Datos
require("./base-orm/sqlite-init");  // crear base si no existe
app.use(express.json()); // para poder leer json en el body

app.use(express.json()); // para poder interpretar los datos en formato json en el body

//controlamos la ruta
app.get("/", (req, res) => {
    res.send("Backend inicial del TPI GRUPO9 3k1");
});

const localidadesRouter = require("./routes/localidades");
app.use(localidadesRouter);

const contribuyentesRouter = require("./routes/contribuyentes");
app.use(contribuyentesRouter);

const inmueblesRouter = require("./routes/inmuebles");
app.use(inmueblesRouter);

const vencimientosRouter = require("./routes/vencimientos");
app.use(vencimientosRouter);

//Levantamos el servidor MIENTRAS no se esten ejecutando los TEST
if (!module.parent) {   // si no es llamado por otro modulo, es decir, si es el modulo principal -> levantamos el servidor
    const port = process.env.PORT || 3000;   // en produccion se usa el puerto de la variable de entorno PORT
    app.locals.fechaInicio = new Date();
    app.listen(port, () => {
      console.log(`sitio escuchando en el puerto ${port}`);
    });
  }
  module.exports = app; // para testing