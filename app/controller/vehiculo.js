const model = require("../lib/models");
const Op = require("sequelize").Op;

function parse(vehiculo) {
  return {
    id: vehiculo.id,
    patente: vehiculo.patente,
    asientos: vehiculo.asientos,
    modelo: vehiculo.modelo,
    marca: vehiculo.marca,
    confort: vehiculo.confort,
    habilitado: true,
  };
}
const findDuplicates = async (vehicle) => {
  return model.Vehiculo.findAll({
    where: { patente: vehicle.patente, habilitado: true },
  });
};
const countVehicle = async () => {
  try {
    return model.Vehiculo.findAll().then((response) => {
      console.log(parseInt(Object.keys(response).length) + 1);
      return parseInt(Object.keys(response).length) + 1;
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
//alta vehiculo
const addVehicle = async (req, res) => {
  const vehiculo = req.body;
  const oldVehicleExist = await findDuplicates(vehiculo);
  if (oldVehicleExist[0]) {
    res.status(401).json({
      message: "La patente ya se encuentra registrada en otro vehiculo",
    });
  } else {
    model.Vehiculo.create(parse(vehiculo)).then(() => {
      try {
        res.status(200).json({ created: parse(vehiculo) });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      }
    });
  }
};
//listar vehiculos
const listVehicle = async (req, res, next) => {
  try {
    model.Vehiculo.findAll({ where: { habilitado: true } }).then((response) => {
      res.status(200).json({ data: response });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server error" });
  }
};
//modificar vehiculo
const updateVehicle = async (req, res, next) => {
  const vehiculo = parse(req.body);
  const oldVehicle = await findDuplicates(vehiculo).then((response) => {
    try {
      return response[0].dataValues;
    } catch {
      res
        .status(401)
        .json({ message: "El vehiculo no se encuentra registrado" });
    }
  });
  if (oldVehicle.patente == vehiculo.patente && oldVehicle.id == vehiculo.id) {
    model.Vehiculo.update(vehiculo, {
      where: { patente: vehiculo.patente },
    }).then((response) => {
      try {
        res.status(201).json({ modified: vehiculo });
      } catch {
        res.status(500).json({ message: "Internal server error" });
      }
    });
  } else {
    res.status(400).json({ message: "Bad request" });
  }
};
//busca vehiculo por unidad y lo devuelve
const findOneVehicle = async (req, res, next) => {
  const vehiculo = req.params;
  model.Vehiculo.findOne({ where: { id: vehiculo.id } }).then((response) => {
    try {
      if (response) {
        res.status(200).json({ data: parse(response) });
      } else {
        res.status(402).json({ error: "Bad request." });
      }
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
  });
};
const remove = async (req, res) => {
  const { id } = req.params;
  model.Vehiculo.findByPk(id).then((response) => {
    try {
      if (response.dataValues.habilitado) {
        model.Vehiculo.update(
          { habilitado: false },
          { where: { id: id } }
        ).then(() => {
          res.status(200).json({ message: "removed" });
        });
      } else {
        res
          .status(400)
          .json({ message: "This vehicle has been removed already" });
      }
    } catch (err) {
      res.status(400).json({ message: "Bad Request" });
    }
  });
};
module.exports = {
  addVehicle,
  listVehicle,
  findOneVehicle,
  updateVehicle,
  remove,
};
