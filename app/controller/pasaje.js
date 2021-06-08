const model = require("../lib/models");
const Op = require("sequelize").Op;

const create = async (req, res) => {
  const pasaje = req.body;
  try {
    const viaje = await model.Viaje.findOne({
      where: { id: pasaje.viaje, habilitado: true },
    });
    const pasajero = await model.Usuario.findOne({
      where: { id: pasaje.pasajero, tipo: 3 },
    });
    if (pasaje.insumo) {
      const insumo = await model.Insumo.findOne({
        where: { id: pasaje.insumo },
      });
    }
    // chequear que pueda realizar la compra, si es que puede hago todo
    const estado = await model.Estado.findOne({
      where: { estado: "Pendiente" },
    });
    //let precio = viaje.precio;
    //if (pasaje.insumo) {
    //  precio += pasaje.insumo;
    //}

    const pasajex = await model.Pasaje.create({
      habilitado: true,
      precio: pasaje.precio,
    }).then((response) => {
      response.setPasajero(pasajero);
      response.setEstado(estado);
      response.setViaje(viaje);
      res.status(200).json({ data: response });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const parsePasajes = async (pasajes) => {
  let result = [];
  for (i = 0; i < pasajes.length; i++) {
    let pasaje = {
      id: pasajes[i].id,
      estado: await pasajes[i].getEstado(),
      viaje: await pasajes[i].getViaje(),
      precio: pasajes[i].precio,
    };
    result.unshift(pasaje);
  }
  return result;
};

const list = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await model.Usuario.findOne({ where: { id: id, tipo: 3 } });
    const pasaje = await usuario.getPasajes();
    //const estado = await pasaje.getEstado();
    //const viaje = await pasaje.getViajes();
    const pasajes = await parsePasajes(pasaje);
    res.status(200).json({ usuario: usuario, pasajes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  create,
  list,
};
