const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

/*router.get("/api/localidades", async function (req, res, next) {
  let data = await db.localidades.findAll({
    attributes: ["CodigoPostal", "Nombre_Localidad","AñoFundacion"],
  });
  res.json(data);
});*/
router.get("/api/localidades", async function (req, res, next) {
  // #swagger.tags = ['vencimientos']
  // #swagger.summary = 'obtiene todos los vencimientos'
  // consulta de vencimientos con filtros y paginacion

  let where = {};
  if (req.query.CodigoPostal != undefined && req.query.CodigoPostal!== "") {
    where.CodigoPostal = {
      [Op.eq]: req.query.CodigoPostal,
    };
  }
  
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.localidades.findAndCountAll({
    attributes: [
      "CodigoPostal",
      "Nombre_Localidad",
      "FechaFundacion",
    ],
    order: [["CodigoPostal", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
}); 


// Método GET que devuelve una localidad segun su ID:
router.get("/api/localidades/:id", async function (req, res, next) {
  // #swagger.tags = ['vencimientos']
  // #swagger.summary = 'obtiene un vencimientos'
  // #swagger.parameters['id'] = { description: 'identificador del vencimientos...' }
  let items = await db.localidades.findOne({
    attributes: [
      "CodigoPostal", 
      "Nombre_Localidad",
      "FechaFundacion"
    ],
    where: { CodigoPostal: req.params.id },
  });
  res.json(items);
});
  
  router.post("/api/localidades/", async (req, res) => {
    // #swagger.tags = ['contribuyentes']
    // #swagger.summary = 'agrega un contribuyentes'
    /*    #swagger.parameters['item'] = {
                  in: 'body',
                  description: 'nuevo Contribuyente',
                  schema: { $ref: '#/definitions/contribuyentes' }
      } */
    try {
      let data = await db.localidades.create({
        CodigoPostal: req.body.CodigoPostal,
        Nombre_Localidad: req.body.Nombre_Localidad,
        FechaFundacion:req.body.FechaFundacion,
      });
      res.status(200).json(data.dataValues); // devolvemos el registro agregado!
    } catch (err) {
      if (err instanceof ValidationError) {
        // si son errores de validacion, los devolvemos
        let messages = '';
        err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
        res.status(400).json({message : messages});
      } else {
        // si son errores desconocidos, los dejamos que los controle el middleware de errores
        throw err;
      }
    }
  });
  
  router.put("/api/localidades/:id", async (req, res) => {
    // #swagger.tags = ['contribuyentes']
    // #swagger.summary = 'actualiza un Contribuyente'
    // #swagger.parameters['id'] = { description: 'identificador del Contribuyente...' }
    /*    #swagger.parameters['Contribuyente'] = {
                  in: 'body',
                  description: 'Contribuyente a actualizar',
                  schema: { $ref: '#/definitions/contribuyentes' }
      } */
  
    try {
      let item = await db.localidades.findOne({
        attributes: [
          "CodigoPostal",
          "Nombre_Localidad",
          "FechaFundacion",
        ],
        where: { CodigoPostal: req.params.id },
      });
      if (!item) {
        res.status(404).json({ message: "Localidad no encontrada" });
        return;
      }
      item.CodigoPostal = req.body.CodigoPostal;
      item.Nombre_Localidad = req.body.Nombre_Localidad;
      item.FechaFundacion = req.body.FechaFundacion;
      await item.save();
  
  
      res.sendStatus(200);
    } catch (err) {
      if (err instanceof ValidationError) {
        // si son errores de validacion, los devolvemos
        let messages = '';
        err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
        res.status(400).json({message : messages});
      } else {
        // si son errores desconocidos, los dejamos que los controle el middleware de errores
        throw err;
      }
    }
  });
  
  router.delete("/api/localidades/:id", async (req, res) => {
    // #swagger.tags = ['contribuyentes']
    // #swagger.summary = 'elimina un Contribuyente'
    // #swagger.parameters['id'] = { description: 'identificador del Contribuyente..' }
  
    let bajaFisica = false;
  
    if (bajaFisica) {
      // baja fisica
      let filasBorradas = await db.localidades.destroy({
        where: { CodigoPostal: req.params.id },
      });
      if (filasBorradas == 1) res.sendStatus(200);
      else res.sendStatus(404);
    } else {
      // baja logica
      try {
        let filasBorradas = await db.localidades.destroy({
          where: { CodigoPostal: req.params.id },
        });
        if (filasBorradas === 1) {
          res.sendStatus(200);
        } else {
          res.sendStatus(404);
        }
      } catch (err) {
        if (err instanceof ValidationError) {
          // si son errores de validacion, los devolvemos
          const messages = err.errors.map((x) => x.message);
          res.status(400).json(messages);
        } else {
          // si son errores desconocidos, los dejamos que los controle el middleware de errores
          throw err;
        }
      }
    }
  });
module.exports = router;