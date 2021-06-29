const model = require("../lib/models");
const Op = require("sequelize").Op;

const listByTravel = async (req, res) => {
  const { id } = req.params;
  try {
    const valoraciones = await model.Viaje.findOne({
      where: { id: id },
      attributes: [
        "detalle",
        "hora",
        "precio",
        "fecha_salida",
        "asientos_disponibles",
      ],
      include: [
        {
          model: model.Valoracion,
          as: "Valoracion",
          attributes: ["id", "descripcion", "puntuacion"],
        },
      ],
    });
    res.status(200).json({ data: valoraciones });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};
const create = async (req, res) => {
  const { body } = req;
  console.log(body);
  try {
    const pasaje = await model.Pasaje.findOne({ where: { id: body.pasajeId } });
    const viaje = await pasaje.getViaje();
    if ((await pasaje.getValoracion()) == null) {
      const estadoViaje = await viaje.getEstado();
      const estadoPasaje = await pasaje.getEstado();
      if (
        estadoViaje.estado == "Finalizado" &&
        estadoPasaje.estado == "Finalizado"
      ) {
        model.Valoracion.create({
          descripcion: body.descripcion,
          puntuacion: body.puntuacion,
        }).then((response) => {
          response.setPasaje(pasaje);
          response.setViaje(viaje);
          res.status(200).json({ data: response });
        });
      } else {
        res.status(400).json({ message: "No se puede calificar viaje" });
      }
    } else {
      res.status(400).json({ message: "El viaje ya se ha calificado" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  listByTravel,
  create,
};
