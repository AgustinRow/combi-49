const model = require("../lib/models");
const { Op } = require("sequelize").Op;

const update = async (req, res) => {};
const remove = async (req, res) => {};
const list = async (req, res) => {};
const create = async (req, res, next) => {
  try {
    const viaje = req.body;
    const result = await asignDriverWithVehicule(
      res,
      next,
      viaje.chofer,
      viaje.vehiculo
    );
    if (result) {
      const vehiculo = await model.Vehiculo.findOne({
        where: { id: viaje.vehiculo },
      }).then((response) => response);

      model.Viaje.create({
        nombre: viaje.nombre,
        detalle: viaje.detalle,
        hora: viaje.hora,
        asientos_disponibles: vehiculo.asientos,
        fecha_salida: viaje.fecha_salida,
      }).then((viajeCreado) => {
        model.Vehiculo.findOne({
          where: { id: viaje.vehiculo, habilitado: true },
        }).then((response) => {
          response.setViaje(viajeCreado);
        });
        model.Ruta.findOne({
          where: { id: viaje.ruta, habilitado: true },
        }).then((response) => {
          response.setViaje(viajeCreado);
        });
        res.status(200).json({ data: viajeCreado });
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTravel = async (req, res) => {};

//asumo que el chofer y el vehiculo ya existen
const asignDriverWithVehicule = async (res, next, choferId, vehiculoId) => {
  const chofer = await model.Usuario.findOne({
    where: { id: choferId, habilitado: true },
  });
  chofer.getVehiculo({ where: { habilitado: true } }).then((response) => {
    if (response == null) {
      model.Vehiculo.findOne({
        where: { id: vehiculoId, habilitado: true },
      }).then((vehiculo) => {
        vehiculo.getChofer({ where: { habilitado: true } }).then((response) => {
          if (response == null) {
            chofer.setVehiculo(vehiculo).then((response) => response);
          } else {
            res
              .status(400)
              .json({ message: "El vehiculo ya tiene chofer asignado" });
            return false;
          }
        });
      });
    } else {
      res.status(400).json({ message: "El chofer ya tiene vehiculo asignado" });
      return false;
    }
  });
  return true;
};

const removeDriverWithVehicule = async (req, res) => {
  const vehiculo = req.body;
  try {
  } catch {
    res.status(500).json({ message: "Internal Server error" });
  }
};

module.exports = {
  remove,
  list,
  update,
  create,
  getTravel,
};
