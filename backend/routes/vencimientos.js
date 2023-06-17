const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

//Método Get original: 

router.get("/api/vencimientos", async function (req, res, next) {
  // #swagger.tags = ['vencimientos']
  // #swagger.summary = 'obtiene todos los vencimientos'
  // consulta de vencimientos con filtros y paginacion

  let where = {};
  if (req.query.Nro_Cuota != undefined && req.query.Nro_Cuota!== "") {
    where.Nro_Cuota = {
      [Op.eq]: req.query.Nro_Cuota,
    };
  }
  
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.vencimientos.findAndCountAll({
    attributes: [
      "Nro_Cuota",
      "Año",
      "Fecha_1er_vencimiento",
      "Fecha_2do_vencimiento",
      "Descripcion",
    ],
    order: [["Nro_Cuota", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
}); 


router.get("/api/vencimientos/:id", async function (req, res, next) {
  // #swagger.tags = ['vencimientos']
  // #swagger.summary = 'obtiene un vencimientos'
  // #swagger.parameters['id'] = { description: 'identificador del vencimientos...' }
  let items = await db.vencimientos.findOne({
    attributes: [
      "Nro_Cuota",
      "Año",
      "Fecha_1er_vencimiento",
      "Fecha_2do_vencimiento",
      "Descripcion",
    ],
    where: { Nro_Cuota: req.params.id },
  });
  res.json(items);
});

router.post("/api/vencimientos/", async (req, res) => {
  // #swagger.tags = ['vencimientos']
  // #swagger.summary = 'agrega un vencimientos'
  /*    #swagger.parameters['item'] = {
                in: 'body',
                description: 'nuevo vencimientos',
                schema: { $ref: '#/definitions/vencimientos' }
    } */
  try {
    let data = await db.vencimientos.create({
      Nro_Cuota: req.body.Nro_Cuota,
      Año: req.body.Año,
      Fecha_1er_vencimiento: req.body.Fecha_1er_vencimiento,
      Fecha_2do_vencimiento: req.body.Fecha_2do_vencimiento,
      Descripcion: req.body.Descripcion,
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

router.put("/api/vencimientos/:id", async (req, res) => {
  // #swagger.tags = ['vencimientos']
  // #swagger.summary = 'actualiza un vencimientos'
  // #swagger.parameters['id'] = { description: 'identificador del vencimiento...' }
  /*    #swagger.parameters['vencimientos'] = {
                in: 'body',
                description: vencimientos a actualizar',
                schema: { $ref: '#/definitions/vencimientos' }
    } */

  try {
    let item = await db.vencimientos.findOne({
      attributes: [
        "Nro_Cuota",
        "Año",
        "Fecha_1er_vencimiento",
        "Fecha_2do_vencimiento",
        "Descripcion",
      ],
      where: { Nro_Cuota: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "vencimiento no encontrado" });
      return;
    }
    item.Nro_Cuota = req.body.Nro_Cuota,
    item.Año = req.body.Año,
    item.Fecha_1er_vencimiento = req.body.Fecha_1er_vencimiento,
    item.Fecha_2do_vencimiento = req.body.Fecha_2do_vencimiento,
    item.Descripcion = req.body.Descripcion,
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

router.delete("/api/vencimientos/:id", async (req, res) => {
  // #swagger.tags = ['vencimientos']
  // #swagger.summary = 'elimina unvencimientos '
  // #swagger.parameters['id'] = { description: 'identificador del vencimiento..' }

  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.vencimientos.destroy({
      where: { Nro_Cuota: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja logica
    try {
      let filasBorradas = await db.vencimientos.destroy({
        where: { Nro_Cuota: req.params.id },
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