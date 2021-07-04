const model = require("../lib/models");
const Op = require("sequelize").Op;

const create = async (req, res) => {
  model.Estado.create({
    estado: "Pendiente",
  });
  model.Estado.create({
    estado: "En curso",
  });
  model.Estado.create({
    estado: "Finalizado",
  });
  model.Estado.create({
    estado: "Cancelado",
  });
  model.Estado.create({
    estado: "Rechazado por covid-19",
  });
  model.Estado.create({
    estado: "Ausente",
  });
  model.Estado.create({
    estado: "Iniciado",
  });
};

const list = async (req, res) => {
  try {
    const estados = await model.Estado.findAll({
      attributes: ["id", "estado"],
    });
    res.status(200).json({ data: estados });
  } catch {
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  create,
  list,
};
