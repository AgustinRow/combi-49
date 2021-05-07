const model = require("../lib/models");
const Op = require("sequelize").Op;

function parse(vehiculo) {
  return {
    patente: vehiculo.patente,
    asientos: vehiculo.asientos,
    modelo: vehiculo.modelo,
    marca: vehiculo.marca,
    confort: vehiculo.confort,
    unidad: vehiculo.unidad,
    habilitado: true,
  };
}
const findDuplicates = async (vehicle) => {
  return model.Vehiculo.findAll({
    where: {
      [Op.or]: [{ patente: vehicle.patente }],
    },
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
    res.status(401).json({ message: "This vehicle already exist" });
  } else {
    const unidad = await countVehicle();
    vehiculo.unidad = unidad;
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
      res.status(401).json({ message: "This vehicle does not exist" });
    }
  });
  if (oldVehicle.patente == vehiculo.patente) {
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
  const vehiculo = req.body;
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

module.exports = {
  addVehicle,
  listVehicle,
  findOneVehicle,
  updateVehicle,
};
