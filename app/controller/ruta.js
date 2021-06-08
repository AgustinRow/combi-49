const model = require("../lib/models");
const Op = require("sequelize").Op;

const checkDuplicates = async (origen, destino) => {
  return await model.Ruta.findOne({
    where: { origenId: origen.id, destinoId: destino.id, habilitado: true },
  }).then((response) => {
    return response;
  });
};

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
        const result = await checkDuplicates(origen, destino);
        if (result != null) {
          res.status(401).json({ message: "La ruta ya existe" });
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
              res.status(400).json({ message: "Error en origen o destino" });
            }
          });
        }
      }
    } else {
      res.status(400).json({ message: "Origen y destino son iguales" });
    }
  } catch {
    res.status(500).json({ message: "Internal Server error" });
  }
};

const parseRoute = async (routes) => {
  let result = [];
  for (var i = 0; i < routes.length; i++) {
    console.log(routes[i]);
    const origen = await routes[i].getOrigen();
    const destino = await routes[i].getDestino();
    let ruta = {
      ruta: routes[i],
      origen: origen,
      destino: destino,
    };
    result.unshift(ruta);
  }
  return await result;
};

const list = async (req, res) => {
  try {
    const rutas = await model.Ruta.findAll({
      where: { habilitado: true },
    }).then((response) => {
      return response;
    });
    const result = await parseRoute(rutas);
    res.status(200).json({ data: result });
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

const remove = async (req, res) => {
  const { id } = req.params;
  //para eliminar una ruta no debe tener viaje en asignado
};

//TODO modificar una ruta
const update = async (req, res) => {
  const ruta = req.body;
  model.Ruta.findOne({ where: { id: ruta.id, habilitado: true } }).then(
    (response) => {
      const result = checkDuplicates(ruta.origen, ruta.destino);
      if (result.id == response.id) {
        if (ruta.origen != ruta.destino) {
          response.update(ruta).then((response) => {
            res.status(200).json({ data: response });
          });
        } else {
          res
            .status(400)
            .json({ message: "Origen y Destino deben ser distintos" });
        }
      } else {
        res
          .status(400)
          .json({ message: "Esta ruta ya esta asignada a otra ciudad" });
      }
    }
  );
};

module.exports = {
  list,
  create,
  listOrigin,
  getRoute,
  remove,
  update,
};
