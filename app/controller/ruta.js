const model = require("../lib/models");
const Op = require("sequelize").Op;

async function checkDuplicates(origen, destino) {
  return await model.Ruta.findOne({
    where: { origenId: origen.id, destinoId: destino.id, habilitado: true },
  }).then((response) => {
    return response != null;
  });
}
// sin duplicados, origen y destino obligatorio, origen != destino
const create = async (req, res) => {
  const ruta = req.body;
  try {
    if (ruta.origen != ruta.destino) {
      const origen = await model.Ciudad.findOne({
        where: { id: ruta.origen, habilitado: true },
      }).then((response) => response);
      const destino = await model.Ciudad.findOne({
        where: { id: ruta.destino, habilitado: true },
      }).then((response) => response);
      if (origen && destino) {
        if (await checkDuplicates(origen, destino)) {
          res.status(401).json({ message: "Route already exist" });
        } else {
          model.Ruta.create({
            nombre: ruta.nombre,
            distancia: ruta.distancia,
            habilitado: true,
          }).then((response) => {
            try {
              response.setOrigen(ruta.origen);
              response.setDestino(ruta.destino);
              res.status(201).json({ data: response, origen, destino });
            } catch (err) {
              res.status(400).json({ message: "error on origen or destiny" });
            }
          });
        }
      }
    } else {
      res.status(400).json({ message: "Origen and Destiny are equal" });
    }
  } catch {
    res.status(500).json({ message: "Internal Server error" });
  }
};

const list = async (req, res) => {
  try {
    model.Ruta.findAll().then((response) => {
      try {
        res.status(200).json(response);
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
//solo de prueba
const listOrigin = async (req, res) => {
  const cityId = req.params.id;
  model.Ruta.findAll({ where: { origenId: cityId } }).then((response) => {
    console.log(response);
    response.getOrigen().then((resp) => {
      console.log(resp);
    });
    res.status(200).json({ data: response });
  });
};

const getRoute = async (req, res) => {
  const ruta = req.body;
  try {
    if (ruta.origen != ruta.destino) {
      const origen = await model.Ciudad.findOne({
        where: { id: ruta.origen, habilitado: true },
      }).then((response) => response);
      const destino = await model.Ciudad.findOne({
        where: { id: ruta.destino, habilitado: true },
      }).then((response) => response);
      if (origen && destino) {
        origen
          .getOrigen({
            where: { destinoId: destino.id, habilitado: true },
          })
          .then((response) => {
            if (response.length) {
              res.status(200).json({ data: response, origen, destino });
            } else {
              res.status(400).json({ message: "Route not found" });
            }
          });
      } else {
        res.status(400).json({ message: "Cities not found" });
      }
    } else {
      res.status(400).json({ message: "Origen and Destiny are equal" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server error" });
  }
};

//TODO modificar una ruta

module.exports = {
  list,
  create,
  listOrigin,
  getRoute,
};
