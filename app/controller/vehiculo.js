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
const add = async (req, res) => {
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
const list = async (req, res, next) => {
  try {
    model.Vehiculo.findAll({ where: { habilitado: true } }).then((response) => {
      res.status(200).json({ data: response });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server error" });
  }
};
const listAvailableVehicle = async (req, res) => {
  try {
    model.Vehiculo.findAll({
      where: { habilitado: true, ViajeId: null },
      attributes: ["id", "patente", "asientos", "marca", "confort"],
    }).then((response) => {
      res.status(200).json({ data: response });
    });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};
//modificar vehiculo
const updateVehicle = async (req, res, next) => {
  const vehiculo = parse(req.body);
  try {
    const oldVehicle = await findDuplicates(vehiculo).then((response) => {
      try {
        return response[0].dataValues;
      } catch {
        res
          .status(401)
          .json({ message: "El vehiculo no se encuentra registrado" });
      }
    });
    if (
      oldVehicle.patente == vehiculo.patente &&
      oldVehicle.id == vehiculo.id
    ) {
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
  } catch {
    res.status(500).json({ message: "Internal server error" });
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
  try {
    const vehiculo = await model.Vehiculo.findOne({
      where: { id: id, habilitado: true },
    });
    if (vehiculo != null) {
      const hasTravel = await vehiculo.getViaje();
      console.log(vehiculo);
      if (hasTravel != null) {
        res.status(400).json({
          message:
            "No se puede eliminar vehiculo con viaje pendiente o en curso",
        });
        return;
      }
      vehiculo.update({ habilitado: false }).then((response) => {
        res.status(200).json({ message: "Vehiculo eliminado exitosamente" });
      });
    } else {
      res.status(400).json({ message: "Este vehiculo no existe" });
    }
  } catch {
    res.status(500).json({ message: "Internal Server error" });
  }
};
module.exports = {
  add,
  list,
  findOneVehicle,
  updateVehicle,
  remove,
  listAvailableVehicle,
};
