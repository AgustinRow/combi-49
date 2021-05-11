const model = require("../lib/models");
const Op = require("sequelize").Op;

function origen(ciudad) {
  model.Ciudad.findByPk(ciudad.origen).then((response) => {
    model.Origen.create({
      include: [response],
    });
  });
}

const create = async (req, res) => {
  const ruta = req.body;
  //origen(ruta);
  model.Ruta.create({
    nombre: ruta.nombre,
    distancia: ruta.distancia,
    habilitado: true,
    origen_id: ruta.origen,
    destino_id: ruta.destino,
  });
};

const list = async (req, res) => {
  try {
    model.Ruta.findAll({ include: [model.Origen] }).then((response) => {
      try {
        res.status(200).json(response);
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  list,
  create,
};
