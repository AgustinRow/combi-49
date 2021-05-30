const model = require("../lib/models");
const { Op } = require("sequelize").Op;

const create = async (req, res) => {
  const provincia = req.body;
  try {
    model.Provincia.findOne({ where: { nombre: provincia.nombre } }).then(
      (response) => {
        if (response) {
          res.status(400).json({ message: "Province already exist" });
        } else {
          model.Provincia.create({
            nombre: provincia.nombre,
            habilitado: true,
          }).then((response) => {
            res.status(200).json({ data: response });
          });
        }
      }
    );
  } catch {
    res.status(500).json({ message: "Internal serve error" });
  }
};

const list = async (req, res) => {
  model.Provincia.findAll({ where: { habilitado: true } }).then((response) => {
    try {
      res.status(200).json({ data: response });
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

const listCities = async (req, res) => {
  const { id } = req.params;
  const provincia = await model.Provincia.findOne({
    where: { id: id, habilitado: true },
  }).then((response) => response);
  if (provincia != null) {
    provincia.getCiudads().then((ciudades) => {
      res.status(200).json({ provincia: provincia.nombre, ciudades });
    });
  } else {
    res.status(400).json({ message: "Province without cities associated" });
  }
};

module.exports = { list, create, listCities };
