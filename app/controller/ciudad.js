const model = require("../lib/models");
const Op = require("sequelize").Op;

// listar ciudades
const list = async (req, res) => {
  try {
    model.Ciudad.findAll({
      where: { habilitado: true },
      attributes: ["id", "nombre", "cp"],
      include: [
        {
          model: model.Provincia,
          attributes: ["id", "nombre"],
          as: "Provincia",
        },
      ],
    }).then((response) => {
        res.status(200).json({ data: response });
    });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

const findDuplicates = async (city) => {
  return model.Ciudad.findOne({ where: { cp: city.cp, habilitado: true } });
};

const findDuplicateById = async (city) => {
  const result = await model.Ciudad.findOne({
    where: { id: city.id, habilitado: true },
  });
  return result;
};

//alta ciudad
// chequear que la ciudad este disponible (habilitado: true)
const create = async (req, res) => {
  const city = req.body;
  console.log(city);
  const oldCity = await findDuplicates(city);
  if (oldCity) {
    res.status(401).json({ message: "La ciudad ya existe" });
  } else {
    const provincia = await model.Provincia.findOne({
      where: { id: city.Provincia.id },
    });
    if (provincia != null) {
      model.Ciudad.create({
        nombre: city.nombre,
        cp: city.cp,
        provinciaId: provincia.id,
        habilitado: true,
      }).then(() => {
        try {
          res.status(201).json({ data: city });
        } catch (err) {
          res.status(500).json({ message: "Internal server error" });
        }
      });
    } else {
      res.status(400).json({ message: "Error, id de provincia invalido" });
    }
  }
};

//buscar ciduad
const find = async (req, res) => {
  const city = req.params.id;
  if (city != undefined) {
    try {
      model.Ciudad.findOne({
        where: { habilitado: true },
        attributes: ["id", "nombre", "cp"],
        include: [
          {
            model: model.Provincia,
            attributes: ["id", "nombre"],
            as: "Provincia",
          },
        ],
      }).then((response) => {
        try {
          res.status(200).json({ data: response });
        } catch (err) {
          res.status(400).json({ message: "Id not found" });
        }
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Bad Request" });
    }
  } else {
    console.log("el id de city es undefined");
    res.status(500).json({ message: "Internal server error" });
  }
};
//TODO: actualizar la modificacion para la provincia

const update = async (req, res) => {
  const city = req.body;
  const exist = await findDuplicates(city);
  const correctID = await findDuplicateById(city);
  if (!exist && !!correctID) {
    model.Ciudad.update(city, {
      where: { id: city.id, habilitado: true },
    }).then((response) => {
      try {
        res.status(202).json({ modified: city });
      } catch (err) {
        res.status(500).json({ message: "Internal server error" });
      }
    });
  } else {
    res.status(400).json({ message: "La ciudad ya existe" });
  }
};

const listRoutesForCity = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const ciudad = await model.Ciudad.findOne({ where: { id: id } }).then(
    (response) => {
      return response;
    }
  );
  try {
    ciudad.getOrigen().then((response) => {
      res.status(200).json({ data: response });
    });
  } catch {
    res.status(400).json({ message: "This city does not exist" });
  }
};

const getCityById = async (id) => {
  return model.Ciudad.findOne({ where: { id: id } }).then((response) => {
    return response;
  });
};

const hasOrigenOrDestiny = async (ciudad) => {
  const origen = await ciudad.getOrigen().then((response) => {
    return response;
  });
  const destino = await ciudad.getDestino().then((response) => {
    return response;
  });

  if (origen.length || destino.length) {
    return false;
  } else {
    return true;
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  const ciudad = await getCityById(id);
  if (ciudad != null) {
    try {
      const canBeRemoved = await hasOrigenOrDestiny(ciudad);
      if (canBeRemoved) {
        ciudad.update({ habilitado: false }).then((response) => {
          res.status(200).json({ message: "Eliminado exitosamente" });
        });
      } else {
        res.status(400).json({
          message:
            "La ciudad no se puede eliminar ya que esta asociada a una ruta",
        });
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(400).json({ message: "City not found" });
  }
};

module.exports = {
  list,
  create,
  find,
  update,
  remove,
  listRoutesForCity,
};
