const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

//Método Get original: 


router.get("/api/contribuyentes", async function (req, res, next) {

  let where = {};
  if (req.query.Nro_Contribuyente != undefined && req.query.Nro_Contribuyente !== "") {
    where.Nro_Contribuyente = {
      [Op.eq]: req.query.Nro_Contribuyente,
    };
  }
  
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.contribuyentes.findAndCountAll({
    attributes: [
      "Nro_Contribuyente",
      "Nombre",
      "Domicilio",
      "CodigoPostal",
      "Barrio",
      "FechaDeAlta",
    ],
    order: [["Nro_Contribuyente", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
}); 




router.get("/api/contribuyentes/:id", async function (req, res, next) {
  let items = await db.contribuyentes.findOne({
    attributes: [
      "Nro_Contribuyente",
      "Nombre",
      "Domicilio",
      "CodigoPostal",
      "Barrio",
      "FechaDeAlta",
    ],
    where: { Nro_Contribuyente: req.params.id },
  });
  res.json(items);
});



router.post("/api/contribuyentes/", async (req, res) => {

  try {
    let data = await db.contribuyentes.create({
      Nro_Contribuyente: req.body.Nro_Contribuyente,
      Nombre: req.body.Nombre,
      Domicilio: req.body.Domicilio,
      CodigoPostal: req.body.CodigoPostal,
      Barrio: req.body.Barrio,
      FechaDeAlta: req.body.FechaDeAlta,
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



router.put("/api/contribuyentes/:id", async (req, res) => {

  try {
    let item = await db.contribuyentes.findOne({
      attributes: [
        "Nro_Contribuyente",
        "Nombre",
        "Domicilio",
        "CodigoPostal",
        "Barrio",
        "FechaDeAlta",
      ],
      where: { Nro_Contribuyente: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Contriubyente no encontrado" });
      return;
    }
    item.Nro_Contribuyente = req.body.Nro_Contribuyente;
    item.Nombre = req.body.Nombre;
    item.Domicilio = req.body.Domicilio;
    item.CodigoPostal = req.body.CodigoPostal;
    item.Barrio = req.body.Barrio;
    item.FechaDeAlta = req.body.FechaDeAlta;
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


router.delete("/api/contribuyentes/:id", async (req, res) => {
  // #swagger.tags = ['vencimientos']
  // #swagger.summary = 'elimina unvencimientos '
  // #swagger.parameters['id'] = { description: 'identificador del vencimiento..' }

  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.contribuyentes.destroy({
      where: {Nro_Contribuyente: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja logica
    try {
      let filasBorradas = await db.contribuyentes.destroy({
        where: { Nro_Contribuyente: req.params.id },
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
      }    }
  }
});
module.exports = router;