const model = require("../lib/models");
const Op = require("sequelize").Op;

const driverAndTravel = async (req, res) => {
  try {
    const vehiculos = await model.Vehiculo.findAll({
      where: { ViajeId: null, habilitado: true },
    });
    const choferes = await model.Usuario.findAll({
      where: { vehiculoId: null, habilitado: true },
    });
    res.status(200).json({ vehiculos, choferes });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

const resetDriverAndTravel = async (viaje) => {
  let vehiculo = await viaje.getVehiculo();
  let chofer = await vehiculo.getChofer();
  vehiculo.update({ ViajeId: null });
  chofer.update({ vehiculoId: null });
};
//los choferes y vehiculos que llegan estan disponibles
const update = async (req, res) => {
  const form = req.body;
  try {
    const viaje = await model.Viaje.findOne({
      where: { id: form.id, habilitado: true },
    });
    if (viaje != null) {
      resetDriverAndTravel(viaje);
      const vehiculo = await model.Vehiculo.findOne({
        where: { id: form.vehiculo },
      });
      const chofer = await model.Usuario.findOne({
        where: { id: form.chofer },
      });
      const result = {
        nombre: form.nombre,
        detalle: form.detalle,
        ruta: form.ruta,
        fecha_salida: form.fecha_salida,
        hora: form.hora,
        RutaId: form.ruta,
      };
      viaje.setVehiculo(vehiculo);
      vehiculo.setChofer(chofer);
      model.Viaje.update(result, { where: { id: form.id } }).then(
        (response) => {
          res.status(200).json({ data: viaje });
        }
      );
    } else {
      res.status(400).json({ message: "No se puede modificar viaje" });
    }
  } catch { }
};

const remove = async (req, res) => { };

const find = async (req, res) => {
  const ruta = req.body;
  try {
    const rutax = await model.Ruta.findAll({
      where: {
        [Op.and]: [{ origenId: ruta.origen }, { destinoId: ruta.destino }],
      },
    });
    const result = await listTravel(rutax);
    res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

const listTravel = async (ruta) => {
  let result = [];
  for (i = 0; i < ruta.length; i++) {
    const test = await ruta[i].getViajes();
    result.unshift(test);
  }
  return result;
};

const parseViajes = async (res, viajes) => {
  const result = [];
  for (i = 0; i < viajes.length; i++) {
    let vehiculo = await viajes[i].getVehiculo({ where: { habilitado: true } });
    let chofer = await vehiculo.getChofer({ where: { habilitado: true } });
    let ruta = await model.Ruta.findOne({
      where: { id: viajes[i].RutaId },
    });
    let rutax = {
      origen: await ruta.getOrigen({ where: { habilitado: true } }),
      destino: await ruta.getDestino({ where: { habilitado: true } }),
    };

    let res = {
      viaje: viajes[i],
      vechiculo: vehiculo,
      chofer: chofer,
      ruta: rutax,
    };
    result.unshift(res);
  }
  res.status(200).json({ data: result });
};

//Listar viajes
const list = async (req, res) => {
  const viaje = req.body;
  try {
    model.Viaje.findAll({
      order: ["fecha_salida"],
    }).then((response) => {
      let result;
      parseViajes(res, response);
    });
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const initialize = async (viaje, res) => {
  try {
    const vehiculo = await model.Vehiculo.findOne({
      where: { id: viaje.vehiculo },
    }).then((response) => response);
    model.Viaje.create({
      nombre: viaje.nombre,
      detalle: viaje.detalle,
      hora: viaje.hora,
      asientos_disponibles: vehiculo.asientos,
      fecha_salida: viaje.fecha_salida,
      RutaId: viaje.ruta,
      habilitado: true,
    }).then((viajeCreado) => {
      model.Vehiculo.findOne({
        where: { id: viaje.vehiculo, habilitado: true },
      }).then((response) => {
        response.setViaje(viajeCreado);
      });
      res.status(200).json({ data: viajeCreado });
    });
  } catch {
    res.status(500);
  }
};

//Alta
const create = async (req, res, next) => {
  try {
    const viaje = req.body;
    const chofer = await model.Usuario.findOne({
      where: {
        id: viaje.chofer.id,
        tipo: 2,
        habilitado: true
      },
      NOT_IN: [{
        model: model.Viaje,
        atributes: ['fecha_salida'],
        where: {
          fecha_salida: viaje.fecha_salida
        }
      }]
    }).then(
      (choferLibre) => {
        if (choferLibre == null) {
          res.status(400).json({
            message: "El chofer seleccionado ya tiene un viaje asignado",
          });
        }
        return choferLibre
      });
    const vehiculo = await model.Vehiculo.findOne({
      where: {
        id: viaje.vehiculo.id,
        habilitado: true
      },
      NOT_IN: [{
        model: model.Viaje,
        atributes: ['fecha_salida'],
        where: {
          fecha_salida: viaje.fecha_salida
        }
      }]
    }).then((vehiculoLibre) => {
      //TODO: un vehiculo puede asignarse a un viaje que sea otro dia.
      if (vehiculoLibre == null) {
        res.status(400).json({
          message:
            "El vehiculo seleccionado ya tiene un viaje asignado",
        });
      }
      return vehiculoLibre;
    });
    const ruta = await model.Ruta.findOne({
      where: {
        id: viaje.ruta.id,
        habilitado: true
      }
    });
    if (chofer && vehiculo && ruta) {
      model.Ruta.create({
        nombre: viaje.nombre,
        fecha_salida: viaje.fecha_salida,
        detalle: viaje.detalle,
        hora: viaje.hora
      }).then(
        (nuevoViaje) => {
          try {
            nuevoViaje.setChofer(chofer.id);
            nuevoViaje.setVehiculo(vehiculo.id);
            nuevoViaje.setRuta(ruta.id);
            res.status(201).json({ data: response, origen, destino });
          } catch (err) {
            console.log(err);
            res.status(400).json({ message: "Error en origen o destino" });
          }
        });
    }
} catch (err) {
  console.log(err);
  res.status(500).json({ message: "Internal Server Error" });
}
};

module.exports = {
  remove,
  list,
  update,
  create,
  find,
  driverAndTravel,
};
