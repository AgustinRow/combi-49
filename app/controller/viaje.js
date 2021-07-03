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
  let chofer = await viaje.getChofer();
  await viaje.removeVehiculo(vehiculo);
  await viaje.removeChofer(chofer);
};
//los choferes y vehiculos que llegan estan disponibles
const update = async (req, res) => {
  const viaje = req.body;
  try {
    const viajeAux = await model.Viaje.findOne({
      where: { habilitado: true, id: viaje.id },
    });
    console.log(viaje);
    if (viajeAux != null) {
      const chofer = await model.Usuario.findOne({
        where: { id: viaje._Chofer[0].id, tipo: 2, habilitado: true },
      });
      const vehiculo = await model.Vehiculo.findOne({
        where: { id: viaje._Vehiculo[0].id, habilitado: true },
      });
      const vehiculoOld = await viajeAux.getVehiculo();
      const choferOld = await viajeAux.getChofer();

      const choferTieneViaje = await chofer.getViaje({
        where: {
          habilitado: true,
          fecha_salida: viaje.fecha_salida,
          id: { [Op.ne]: viajeAux.id },
        },
      });
      const vehiculoTieneViaje = await vehiculo.getViaje({
        where: {
          habilitado: true,
          fecha_salida: viaje.fecha_salida,
          id: { [Op.ne]: viajeAux.id },
        },
      });
      if (choferTieneViaje.length == 0) {
        if (vehiculoTieneViaje.length == 0) {
          if (
            vehiculo.asientos -
              (vehiculoOld[0].dataValues.asientos -
                viajeAux.asientos_disponibles) >
            0
          ) {
            const viajeNuevo = await viajeAux.update({
              nombre: viaje.nombre,
              detalle: viaje.detalle,
              hora: viaje.hora,
              asientos_disponibles:
                vehiculo.asientos -
                (vehiculoOld[0].dataValues.asientos -
                  viajeAux.asientos_disponibles),
              fecha_salida: viaje.fecha_salida,
              RutaId: viaje.rutaId,
              precio: viaje.precio,
              EstadoId: 1, //1-Pendiente
              habilitado: true,
            });
            await viajeNuevo.setChofer(chofer);
            await viajeNuevo.setVehiculo(vehiculo);
            res.status(200).json({ message: "Se ha modificado el viaje" });
          } else {
            res.status(400).json({
              message: "Vehiculo sin asientos disponibles para este viaje",
            });
          }
        } else {
          res
            .status(400)
            .json({ message: "Vehiculo tiene viaje asignado para esa fecha" });
        }
      } else {
        res
          .status(400)
          .json({ message: "Chofer tiene viaje asignado para esa fecha" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
//TODO- borrar metodo
const updateX = async (req, res) => {
  const form = req.body;
  try {
    const viaje = await model.Viaje.findOne({
      where: { id: form.id, habilitado: true },
    });
    if (viaje != null) {
      resetDriverAndTravel(viaje);
      const vehiculo = await model.Vehiculo.findOne({
        where: { id: form.Vehiculo },
      });
      const chofer = await model.Usuario.findOne({
        where: { id: form.Chofer },
      });
      const result = {
        nombre: form.nombre,
        detalle: form.detalle,
        ruta: form.Ruta,
        fecha_salida: form.fecha_salida,
        hora: form.hora,
        precio: form.precio,
        RutaId: form.Ruta,
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
  const viaje = req.query;
  console.log(viaje);
  try {
    model.Viaje.findAll({
      where: { habilitado: true, fecha_salida: viaje.fecha },
      attributes: [
        "id",
        "nombre",
        "precio",
        "detalle",
        "asientos_disponibles",
        "fecha_salida",
        "hora",
      ],
      include: [
        {
          model: model.Estado,
          as: "Estado",
          attributes: ["id", "estado"],
        },
        {
          model: model.Vehiculo,
          as: "Vehiculo",
          attributes: [
            "id",
            "patente",
            "asientos",
            "modelo",
            "marca",
            "confort",
          ],
        },

        {
          model: model.Usuario,
          as: "Chofer",
          attributes: ["id", "nombre", "apellido", "email", "dni"],
        },
        {
          as: "Ruta",
          model: model.Ruta,
          where: {
            [Op.and]: [
              { origenId: viaje.origen },
              { destinoId: viaje.destino },
            ],
          },
          attributes: ["id", "nombre", "distancia", "duracion"],
          include: [
            {
              model: model.Ciudad,
              as: "Origen",
              include: [
                {
                  model: model.Provincia,
                  as: "Provincia",
                  attributes: ["id", "nombre"],
                },
              ],
              attributes: ["id", "nombre", "cp"],
            },
            {
              model: model.Ciudad,
              as: "Destino",
              include: [
                {
                  model: model.Provincia,
                  as: "Provincia",
                  attributes: ["id", "nombre"],
                },
              ],
              attributes: ["id", "nombre", "cp"],
            },
          ],
        },
      ],
    }).then((viajes) => {
      if (viajes.length) {
        res.status(200).json({ viajes });
      } else {
        res.status(400).json({ message: "Sin resultados para la busqueda" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server" });
  }
};
//TODO- borrar metodo
const findXX = async (req, res) => {
  const viaje = req.query;
  try {
    model.Ruta.findAll({
      where: {
        [Op.and]: [{ origenId: viaje.Origen }, { destinoId: viaje.Destino }],
      },
      attributes: ["id", "nombre", "distancia", "duracion"],
      include: [
        {
          model: model.Viaje,
          where: { fecha_salida: viaje.fecha },
          attributes: [
            "id",
            "nombre",
            "precio",
            "detalle",
            "asientos_disponibles",
            "fecha_salida",
            "hora",
          ],
        },
        {
          model: model.Ciudad,
          as: "Origen",
          include: [
            {
              model: model.Provincia,
              as: "Provincia",
              attributes: ["id", "nombre"],
            },
          ],
          attributes: ["id", "nombre", "cp"],
        },
        {
          model: model.Ciudad,
          as: "Destino",
          include: [
            {
              model: model.Provincia,
              as: "Provincia",
              attributes: ["id", "nombre"],
            },
          ],
          attributes: ["id", "nombre", "cp"],
        },
      ],
    }).then((ruta) => {
      console.log(ruta);
      res.status(200).json({ data: ruta });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};
//TODO- borrar metodo
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
//TODO- borrar metodo
const listOLD = async (req, res) => {
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
      where: { id: viaje.vehiculoId },
    }).then((response) => response);
    const viajeNuevo = await model.Viaje.create({
      nombre: viaje.nombre,
      detalle: viaje.detalle,
      hora: viaje.hora,
      asientos_disponibles: vehiculo.asientos,
      fecha_salida: viaje.fecha_salida,
      RutaId: viaje.rutaId,
      precio: viaje.precio,
      EstadoId: 1, //1-Pendiente
      habilitado: true,
    });
    await vehiculo.setViaje(viajeNuevo);
    res.status(200).json({ data: viajeNuevo });
  } catch {
    res.status(500);
  }
};

const list = async (req, res) => {
  try {
    model.Viaje.findAll({
      order: ["fecha_salida"],
      where: { habilitado: true },
      attributes: [
        "id",
        "nombre",
        "fecha_salida",
        "detalle",
        "hora",
        "asientos_disponibles",
        "precio",
      ],
      include: [
        {
          model: model.Estado,
          as: "Estado",
          attributes: ["id", "estado"],
        },
        {
          model: model.Vehiculo,
          as: "Vehiculo",
          attributes: [
            "id",
            "patente",
            "asientos",
            "modelo",
            "marca",
            "confort",
          ],
        },

        {
          model: model.Usuario,
          as: "Chofer",
          attributes: ["id", "nombre", "apellido", "email", "dni"],
        },

        {
          model: model.Ruta,
          as: "Ruta",
          attributes: ["id", "nombre", "distancia", "duracion"],
          include: [
            {
              model: model.Ciudad,
              as: "Origen",
              attributes: ["id", "nombre", "cp"],
              include: [
                {
                  model: model.Provincia,
                  as: "Provincia",
                  attributes: ["id", "nombre"],
                },
              ],
            },
            {
              model: model.Ciudad,
              as: "Destino",
              attributes: ["id", "nombre", "cp"],
              include: [
                {
                  model: model.Provincia,
                  as: "Provincia",
                  attributes: ["id", "nombre"],
                },
              ],
            },
          ],
        },
      ],
    }).then((viajes) => {
      console.log(viajes);
      res.status(200).json({ data: viajes });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    console.log(id);
    model.Viaje.findOne({
      order: ["fecha_salida"],
      where: { habilitado: true, id: id },
      attributes: [
        "id",
        "nombre",
        "fecha_salida",
        "detalle",
        "hora",
        "asientos_disponibles",
        "precio",
      ],
      include: [
        {
          model: model.Estado,
          as: "Estado",
          attributes: ["id", "estado"],
        },
        {
          model: model.Vehiculo,
          as: "Vehiculo",
          attributes: [
            "id",
            "patente",
            "asientos",
            "modelo",
            "marca",
            "confort",
          ],
        },
        {
          model: model.Usuario,
          as: "Chofer",
          attributes: ["id", "nombre", "apellido", "email", "dni"],
        },

        {
          model: model.Ruta,
          as: "Ruta",
          attributes: ["id", "nombre", "distancia", "duracion"],
          include: [
            {
              model: model.Ciudad,
              as: "Origen",
              attributes: ["id", "nombre", "cp"],
              include: [
                {
                  model: model.Provincia,
                  as: "Provincia",
                  attributes: ["id", "nombre"],
                },
              ],
            },
            {
              model: model.Ciudad,
              as: "Destino",
              attributes: ["id", "nombre", "cp"],
              include: [
                {
                  model: model.Provincia,
                  as: "Provincia",
                  attributes: ["id", "nombre"],
                },
              ],
            },
          ],
        },
      ],
    }).then((viaje) => {
      res.status(200).json({ data: viaje });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const create = async (req, res) => {
  const viaje = req.body;
  try {
    const ruta = await model.Ruta.findOne({ where: { id: viaje.rutaId } });
    const chofer = await model.Usuario.findOne({
      where: { id: viaje.choferId, tipo: 2, habilitado: true },
    });
    const vehiculo = await model.Vehiculo.findOne({
      where: { id: viaje.vehiculoId, habilitado: true },
    });
    const choferTieneViaje = await chofer.getViaje({
      where: { habilitado: true, fecha_salida: viaje.fecha_salida },
    });
    const vehiculoTieneViaje = await vehiculo.getViaje({
      where: { habilitado: true, fecha_salida: viaje.fecha_salida },
    });
    if (choferTieneViaje.length == 0) {
      if (vehiculoTieneViaje.length == 0) {
        const viajeNuevo = await model.Viaje.create({
          nombre: ruta.nombre,
          detalle: viaje.detalle,
          hora: viaje.hora,
          asientos_disponibles: vehiculo.asientos,
          fecha_salida: viaje.fecha_salida,
          RutaId: viaje.rutaId,
          precio: viaje.precio,
          EstadoId: 1, //1-Pendiente
          habilitado: true,
        });
        await viajeNuevo.setChofer(chofer);
        await viajeNuevo.setVehiculo(vehiculo);
        res.status(200).json(viajeNuevo);
      } else {
        res
          .status(400)
          .json({ message: "Vehiculo tiene viaje asignado para esa fecha" });
      }
    } else {
      res
        .status(400)
        .json({ message: "Chofer tiene viaje asignado para esa fecha" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const start = async (req, res) => {
  const { id } = req.params;
  try {
    const viaje = await model.Viaje.findOne({ where: { id: id } });
    const pasajes = await viaje.getPasaje({
      include: [
        { model: model.Estado, as: "Estado", where: { estado: "Pendiente" } },
      ],
    });
    const iniciar = await model.Estado.findOne({
      where: { estado: "En curso" },
    });
    if (pasajes.length > 0) {
      for (i = 0; pasajes.length > i; i++) {
        pasajes[i].setEstado(iniciar);
      }
      res.status(200).json({ message: "Viaje iniciado" });
    } else {
      res.status(400).json({
        message: "No hay pasajes activos para este viaje.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const finish = async (req, res) => {
  const { id } = req.params;
  try {
    const viaje = await model.Viaje.findOne({ where: { id: id } });
    const pasajes = await viaje.getPasaje({
      include: [
        { model: model.Estado, as: "Estado", where: { estado: "En Curso" } },
      ],
    });
    const finalizar = await model.Estado.findOne({
      where: { estado: "Finalizado" },
    });
    if (pasajes.length > 0) {
      for (i = 0; pasajes.length > i; i++) {
        pasajes[i].setEstado(finalizar);
      }
      viaje.setEstado(finalizar);
      res.status(200).json({ message: "Viaje finalizado con éxito" });
    } else {
      res.status(400).json({
        message: "No hay pasajes en curso para este viaje",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ messag: "Internal server error" });
  }
};

const initTravel = async (req, res) => {
  const { id } = req.params;
  try {
    const viaje = await model.Viaje.findOne({
      where: { id: id, habilitado: true },
    });
    const iniciado = await model.Estado.findOne({
      where: { estado: "Iniciado" },
    });
    viaje.setEstado(iniciado).then((response) => {
      res.status(200).json({ message: "Exito" });
    });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  remove,
  list,
  update,
  create,
  find,
  driverAndTravel,
  findOne,
  start,
  finish,
  initTravel,
};
