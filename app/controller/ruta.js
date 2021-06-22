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
  console.log(ruta);
  try {
    if (ruta.Origen != ruta.Destino) {
      const origen = await model.Ciudad.findOne({
        where: { id: ruta.Origen.id, habilitado: true },
      }).then((response) => response);
      const destino = await model.Ciudad.findOne({
        where: { id: ruta.Destino.id, habilitado: true },
      }).then((response) => response);
      console.log(origen, destino);
      if (origen && destino) {
        const result = await checkDuplicates(origen, destino);
        if (result != null) {
          res.status(401).json({ message: "La ruta ya existe" });
        } else {
          model.Ruta.create({
            nombre: ruta.nombre,
            distancia: ruta.distancia,
            duracion: ruta.duracion,
            habilitado: true,
          }).then((response) => {
            try {
              response.setOrigen(origen);
              response.setDestino(destino);
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
  } catch (err) {
    console.log(err);
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
      origen,
      destino,
    };
    result.unshift(ruta);
  }
  return await result;
};

const listOld = async (req, res) => {
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
const list = async (req, res) => {
  try {
    model.Ruta.findAll({
      attributes: ["id", "nombre", "distancia", "duracion"],
      where: { habilitado: true },
      include: [
        {
          model: model.Ciudad,
          as: "Origen",
          attributes: ["id", "nombre", "cp"],
        },
        {
          model: model.Ciudad,
          as: "Destino",
          attributes: ["id", "nombre", "cp"],
        },
      ],
    }).then((rutas) => {
      res.status(200).json({ data: rutas });
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRoute = async (req, res) => {
  const ruta = req.body;
  try {
    if (ruta.Origen != ruta.Destino) {
      const origen = await model.Ciudad.findOne({
        where: { id: ruta.Origen, habilitado: true },
      }).then((response) => response);
      const destino = await model.Ciudad.findOne({
        where: { id: ruta.Destino, habilitado: true },
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
              res.status(400).json({ message: "Ruta no encontrada" });
            }
          });
      } else {
        res.status(400).json({ message: "Ciduad no encontrada" });
      }
    } else {
      res.status(400).json({ message: "El origen y el destino son iguales" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server error" });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  //para eliminar una ruta no debe tener viaje en asignado
  try {
    const ruta = await model.Ruta.findOne({
      where: { id: id, habilitado: true },
      include: [
        {
          model: model.Viaje,
          include: [
            {
              model: model.Estado,
              as: "Estado",
              where: {
                [Op.or]: [{ id: 1 }, { id: 2 }],
              },
            },
          ],
        },
      ],
    });
    if (ruta.Viajes.length > 0) {
      res.status(400).json({
        message: "No se puede eliminar ruta ya que tiene viaje asociado",
      });
    } else {
      ruta.update({ habilitado: false }).then((response) => {
        res.status(200).json({ message: "Ruta eliminada exitosamente" });
      });
    }
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

//TODO modificar una ruta
const update = async (req, res) => {
  const ruta = req.body;
  model.Ruta.findOne({ where: { id: ruta.id, habilitado: true } }).then(
    (response) => {
      const result = checkDuplicates(ruta.Origen, ruta.Destino);
      if (result.id == response.id) {
        if (ruta.Origen != ruta.Destino) {
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
  getRoute,
  remove,
  update,
};
