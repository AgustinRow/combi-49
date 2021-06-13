const model = require("../lib/models");
const { Op } = require("sequelize").Op;

const create = async (req, res) => {
  const provincia = req.body;
  try {
    model.Provincia.findOne({ where: { nombre: provincia.nombre } }).then(
      (response) => {
        if (response) {
          res
            .status(400)
            .json({ message: "La provincia que intenta agregar ya existe" });
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
  model.Provincia.findAll({
    where: { habilitado: true },
    attributes: ["id", "nombre"],
    include: [
      {
        as: "Ciudad",
        model: model.Ciudad,
        attributes: ["id", "nombre", "cp"],
      },
    ],
  }).then((response) => {
    try {
      res.status(200).json({ data: response });
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

const find = async (req, res) => {
  const { id } = req.params;
  try {
    const provincia = await model.Provincia.findOne({
      where: { id: id, habilitado: true },
      attributes: ["id", "nombre"],
      include: [
        {
          as: "Ciudad",
          model: model.Ciudad,
          attributes: ["id", "nombre", "cp"],
        },
      ],
    });
    if (provincia != null) {
      res.status(200).json({ data: provincia });
    } else {
      res
        .status(400)
        .json({ message: "La provincia que intenta bsucar con existe" });
    }
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};
const update = async (req, res) => {
  const provincia = req.body;
  try {
    const provinciaOld = await model.Provincia.findOne({
      where: { nombre: provincia.nombre },
    });
    if (provinciaOld == null) {
      model.Provincia.update(
        { nombre: provincia.nombre },
        {
          where: { id: provincia.id, habilitado: true },
        }
      ).then((response) => {
        if (response > 0) {
          res.status(200).json({ data: provincia });
        } else {
          res.status(400).json({ message: "No se pudo actualizar provincia" });
        }
      });
    } else {
      res
        .status(400)
        .json({
          message:
            "El nombre de la provincia ya existe, ingrese otro por favor",
        });
    }
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { list, create, find, update };
