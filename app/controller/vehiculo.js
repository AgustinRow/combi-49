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

const addVehicle = async (req, res) => {
  const vehiculo = req.body;
  model.Vehiculo.create(parse(vehiculo)).then(() => {
    try {
      res.status(201).json({ created: parse(vehiculo) });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });;
};

module.exports = {
  addVehicle,
};
