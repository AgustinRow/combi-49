const model = require("../lib/models");
const Op = require("sequelize").Op;

const findViandaWithName = async (vianda) => {
  const exist = await model.Vianda.findOne({
    where: { nombre: vianda.nombre },
  });
  return await exist;
};

const create = async (req, res) => {
  const vianda = req.body;
  console.log(await exist(vianda));

  try {
    if ((await findViandaWithName(vianda)) != null) {
      res
        .status(400)
        .json({ message: "La vianda que intenta agregar ya existe" });
    } else {
      model.Vianda.create({
        nombre: vianda.nombre,
        descripcion: vianda.descripcion,
        precio: vianda.precio,
        habiltiado: true,
      }).then((response) => {
        res.status(200).json({ data: "Creado" });
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ meesage: "Internal server error" });
  }
};

const update = async (req, res) => {
  const vianda = req.body;
  try {
    const result = model.Vianda.findOne({
      where: { nombre: vianda.nombre, habiltiado: true },
    });
    if (vianda.id == result.id || result != null) {
      model.Vianda.update(
        {
          nombre: vianda.nombre,
          precio: vianda.precio,
          descripcion: vianda.descripcion,
        },
        { where: { id: vianda.id } }
      ).then((response) => {
        res.status(200).json({ message: "Actualizado correctamente" });
      });
    } else {
      res.status(400).json({
        message: "No se puede actualiar, ya existe ese nombre para la vianda",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  create,
  update,
};
