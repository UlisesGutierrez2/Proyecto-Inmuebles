const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

//Método Get original: 

router.get("/api/inmuebles", async function (req, res, next) {

  let where = {};
  if (req.query.Numero_Catastral != undefined && req.query.Numero_Catastral !== "") {
    where.Numero_Catastral = {
      [Op.eq]: req.query.Numero_Catastral,
    };
  }
  if (req.query.Ubicacion != undefined && req.query.Ubicacion !== "") {
    where.Ubicacion = {
      [Op.like]: "%" + req.query.Ubicacion + "%",
    };
  }
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 50;
  const { count, rows } = await db.inmuebles.findAndCountAll({
    attributes: [
      "Numero_Catastral",
      "Ubicacion",
      "Zona",
      "Tipo",
      "Numero_Contribuyente",
      "FechaRegCatastro",
    ],
    order: [["Numero_Catastral", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
}); 


router.get("/api/inmuebles/:id", async function (req, res, next) {
  // #swagger.tags = ['Contriubyentes']
  // #swagger.summary = 'obtiene un Contribuyente'
  // #swagger.parameters['id'] = { description: 'identificador del Contribuyente...' }
  let items = await db.inmuebles.findOne({
    attributes: [
        "Numero_Catastral",
        "Ubicacion",
        "Zona",
        "Tipo",
        "Numero_Contribuyente",
        "FechaRegCatastro",
    ],
    where: { Numero_Catastral: req.params.id },
  });
  res.json(items);
});

router.post("/api/inmuebles/", async (req, res) => {

  try {
    let data = await db.inmuebles.create({
      Numero_Catastral: req.body.Numero_Catastral,
      Ubicacion: req.body.Ubicacion,
      Zona: req.body.Zona,
      Tipo: req.body.Tipo,
      Numero_Contribuyente: req.body.Numero_Contribuyente,
      FechaRegCatastro: req.body.FechaRegCatastro,
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

router.put("/api/inmuebles/:id", async (req, res) => {
  // #swagger.tags = ['inmuebles']
  // #swagger.summary = 'actualiza un Contribuyente'
  // #swagger.parameters['id'] = { description: 'identificador del Contribuyente...' }
  /*    #swagger.parameters['Contribuyente'] = {
                in: 'body',
                description: 'Contribuyente a actualizar',
                schema: { $ref: '#/definitions/inmuebles' }
    } */

  try {
    let item = await db.inmuebles.findOne({
      attributes: [
        "Numero_Catastral",
        "Ubicacion",
        "Zona",
        "Tipo",
        "Numero_Contribuyente",
        "FechaRegCatastro",
      ],
      where: { Numero_Catastral: req.params.id},
    });
    if (!item) {
      res.status(404).json({ message: "Inmueble no encontrado" });
      return;
    }
    item.Numero_Catastral = req.body.Numero_Catastral;
    item.Ubicacion = req.body.Ubicacion;
    item.Zona = req.body.Zona;
    item.Tipo = req.body.Tipo;
    item.Numero_Contribuyente = req.body.Numero_Contribuyente;
    item.FechaRegCatastro = req.body.FechaRegCatastro;
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

router.delete("/api/inmuebles/:id", async (req, res) => {
  // #swagger.tags = ['inmuebles']
  // #swagger.summary = 'elimina un Contribuyente'
  // #swagger.parameters['id'] = { description: 'identificador del Contribuyente..' }

  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.inmuebles.destroy({
      where: { Numero_Catastral: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja logica
    try {
      let filasBorradas = await db.inmuebles.destroy({
        where: { Numero_Catastral: req.params.id },
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