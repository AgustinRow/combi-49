const model = require("../lib/models");
const Op = require("sequelize").Op;

// listar ciudades
const listCities = async (req, res) => {
  model.Ciudad.findAll({ where: { habilitado: true } }).then((response) => {
    try {
      console.log(parseCitiesData(response));
      res.status(200).json({ data: parseCitiesData(response) });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  function parseCitiesData(cities) {
    var result = [];
    cities.forEach((element) => {
      result.unshift(parse(element));
    });
    return result;
  }
};

const findDuplicates = async (city) => {
  return model.Ciudad.findOne({ where: { nombre: city.nombre } });
};

function parse(city) {
  return {
    id: city.id,
    nombre: city.nombre,
  };
}

//alta ciudad
const create = async (req, res) => {
  const city = req.body;
  const oldCity = await findDuplicates(city);
  if (oldCity[0]) {
    res.status(401).json({ message: "This City already exist" });
  } else {
    model.Ciudad.create({ nombre: city.nombre, habilitado: true }).then(() => {
      try {
        res.status(201).json({ created: city });
      } catch (err) {
        res.status(500).json({ message: "Internal server error" });
      }
    });
  }
};

//buscar ciduad
const find = async (req, res) => {
  const city = req.params.id;
  if (city != undefined) {
    try {
      model.Ciudad.findOne({ where: { id: city } }).then((response) => {
        try {
          res.status(200).json({ data: parse(response) });
        } catch (err) {
          res.status(400).json({ message: "Id not found" });
        }
      });
    } catch (err) {
      res.status(400).json({ message: "Bad Request" });
    }
  } else {
    console.log("el id de city es undefined");
    res.status(500).json({ message: "Internal server error" });
  }
};
//chequear duplicados y id que corresponda al dato que modifica
//cuando ingreso un id que no esta debo devolver error y en cambio estoy devolviendo
const update = async (req, res) => {
  const city = req.body;
  const exist = await findDuplicates(city);
  if (!exist) {
    model.Ciudad.update(city, {
      where: { id: city.id, habilitado: true },
    }).then((response) => {
      try {
        res.status(202).json({ modified: city });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      }
    });
  } else {
    res.status(400).json({ message: "This city already exist" });
  }
};

module.exports = {
  listCities,
  create,
  find,
  update,
};
