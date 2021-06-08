const model = require("../lib/models");
const { Op } = require("sequelize").Op;

const create = async (req, res) => {
  const parada = req.body;
  try {
    model.Ciudad.findOne({ where: { id: parada.ciudad } }).then((response) => {
      if (response != null) {
        model.Parada.create({
          nombre: parada.nombre,
          habilitado: true,
          ciudadId: response.id,
          direccion: parada.direccion,
        }).then((response) => {
          res.status(200).json({ created: response });
        });
      }
    });
  } catch {
    res.status(500);
  }
};
const list = async (req, res) => {
  const { id } = req.params;
  try {
    model.Parada.findOne({ where: { id: id } }).then((response) => {
      if (response != null) {
        response.getCiudad({ where: { habilitado: true } }).then((ciudad) => {
          res.status(200).json({ parada: response, ciudad });
        });
      } else {
        res.status(400).json({ message: "Parada no encontrada" });
      }
    });
  } catch {
    res.status(500);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {

  } catch {
    res.status(500), json({ message: "Internal Server Error" });
  }
};

//TODO: modificar una parada
const update = async (req, res) => {};

module.exports = { create, list, remove };
