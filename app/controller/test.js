const model = require("../lib/models");
const Op = require("sequelize").Op;
const Pasaje = require("../controller/pasaje");

const changeToRejected = async (pasaje) => {
  const rechazado = await model.Estado.findOne({
    where: { estado: "Rechazado por covid-19" },
  });
  console.log(rechazado);
  await pasaje.setEstado(rechazado);
  const pasajero = await pasaje.getPasajero();
  pasajero.update({ saldo: pasaje.precio + pasajero.saldo });
  const viandas = await pasaje.getVianda();
  const viaje = await pasaje.getViaje();
  await Pasaje.actualizarStock(viandas, viaje);
};

// chequear que cambie el estado a rechazado
const create = async (req, res) => {
  const { body } = req;
  try {
    const pasaje = await model.Pasaje.findOne({
      where: { id: body.pasajeId },
    });
    const test = await pasaje.getTest();
    if (test == null) {
      let resultado_covid = !(
        body.olfato &&
        body.temperatura < 37.5 &&
        !body.contacto_estrecho
      );
      if (resultado_covid) {
        await changeToRejected(pasaje);
      }
      model.Test.create({
        olfato: body.olfato,
        temperatura: body.temperatura,
        contacto_estrecho: body.contacto_estrecho,
        resultado: resultado_covid,
      }).then((response) => {
        response.setPasaje(pasaje);
        res.status(200).json({ data: resultado_covid });
      });
    } else {
      res.status(400).json({ message: "El pasajero ya fue testeado" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { create };
