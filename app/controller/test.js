const model = require("../lib/models");
const Op = require("sequelize").Op;

const create = async (req, res) => {
  const { body } = req;
  try {
    console.log(body);
    const pasaje = await model.Pasaje.findOne({
      where: { id: body.pasajeId },
    });
    console.log(pasaje);
    let resultado_covid;
    if (body.olfato && body.temperatura <= 36.7 && !!body.contacto_estrecho) {
      resultado_covid = true;
    } else {
      resultado_covid = false;
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { create };
