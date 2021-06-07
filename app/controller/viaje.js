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
        precio: form.hora,
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
  } catch {}
};

const remove = async (req, res) => {};

const find = async (req, res) => {
  const ruta = req.body;
  try {
    const rutax = await model.Ruta.findAll({
      where: {
        [Op.and]: [{ origenId: ruta.origen }, { destinoId: ruta.destino }],
      },
    });
    const result = await listTravel(rutax, ruta.fecha_salida);
    res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

const listTravel = async (ruta, fecha) => {
  let result = [];
  for (i = 0; i < ruta.length; i++) {
    const test = await ruta[i].getViajes({ where: { fecha_salida: fecha } });
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
      precio: viajes[i].precio,
    };
    result.unshift(res);
  }
  res.status(200).json({ data: result });
};

const list = async (req, res) => {
  const viaje = req.body;
  try {
    model.Viaje.findAll({
      order: ["fecha_salida"],
    }).then((response) => {
      if (response != null) {
        parseViajes(res, response);
      } else {
        res.status(200).json({ data: {} });
      }
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
      precio: viaje.precio,
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

const create = async (req, res, next) => {
  try {
    const viaje = req.body;
    const chofer = await model.Usuario.findOne({
      where: { id: viaje.chofer, tipo: 2, habilitado: true },
    });
    chofer.getVehiculo({ where: { habilitado: true } }).then((response) => {
      if (response == null) {
        model.Vehiculo.findOne({
          where: { id: viaje.vehiculo, habilitado: true },
        }).then((vehiculo) => {
          vehiculo
            .getChofer({ where: { habilitado: true } })
            .then((response) => {
              //TODO: un vehiculo puede asignarse a un viaje que sea otro dia.
              if (response == null) {
                chofer.setVehiculo(vehiculo).then((response) => response);
                initialize(viaje, res);
              } else {
                res.status(400).json({
                  message:
                    "El vehiculo seleccionado ya tiene un viaje asignado",
                });
              }
            });
        });
      } else {
        res.status(400).json({
          message: "El chofer seleccionado ya tiene un viaje asignado",
        });
      }
    });
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
