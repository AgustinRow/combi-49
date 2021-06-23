const model = require("../lib/models");
const Op = require("sequelize").Op;

const findViandaWithName = async (vianda) => {
  const exist = await model.Vianda.findOne({
    where: { nombre: vianda.nombre, habilitado: true },
  });
  return await exist;
};

const create = async (req, res) => {
  const vianda = req.body;
  console.log(vianda);
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
        stock: vianda.stock,
        habilitado: true,
      }).then((response) => {
        res.status(200).json({ data: response });
      });
      console.log("---------------");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ meesage: "Internal server error" });
  }
};

const update = async (req, res) => {
  const vianda = req.body;
  try {
    const result = await model.Vianda.findOne({
      where: {
        nombre: vianda.nombre,
        habilitado: true,
        id: { [Op.ne]: vianda.id },
      },
    });
    if (result == null) {
      model.Vianda.update(
        {
          nombre: vianda.nombre,
          precio: vianda.precio,
          descripcion: vianda.descripcion,
          stock: vianda.stock,
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

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const vianda = await model.Vianda.findOne({
      where: { id: id, habilitado: true },
    });
    const pasaje = await vianda.getPasaje();
    if (pasaje != null) {
      model.Vianda.update({ habilitado: false }, { where: { id: id } }).then(
        (response) => {
          res.status(201).json({ message: "Vianda Eliminada" });
        }
      );
    } else {
      res
        .status(400)
        .json({ message: "No se puede eliminar vianda con pasaje asociado" });
    }
  } catch {
    res.status(500).json({ message: "Internal Server error" });
  }
};

const buy = async (req, res) => {
  const { body } = req;

  try {
    const pasaje = await model.Pasaje.findOne({
      where: { id: body.pasajeId, habilitado: true },
    });

    for (i = 0; i < body.viandas.length; i++) {
      const vianda = await model.Vianda.findOne({
        where: { id: body.viandas[i].id, habilitado: true },
      });
      if (vianda.stock > 0) {
        pasaje.addVianda(vianda).then((response) => {
          if (response) {
            pasaje.update({ precio: pasaje.precio + vianda.precio });
            vianda.update({ stock: vianda.stock - 1 });
          } else {
            res.status(400).json({
              message: "Ya ha comprado ese insumo, por favor seleccione otro",
            });
            return;
          }
        });
      } else {
        res
          .status(400)
          .json({ message: "No hay stock para la vianda" + vianda.nombre });
      }
    }
    res.status(200).json({ message: "Viandas agregadas al pasaje" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const list = async (req, res) => {
  try {
    model.Vianda.findAll({
      where: { habilitado: true },
      attributes: ["id", "nombre", "precio", "descripcion", "stock"],
    }).then((viandas) => {
      res.status(200).json({ data: viandas });
    });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

const detail = async (req, res) => {
  const { id } = req.params;
  try {
    model.Vianda.findOne({
      where: { habilitado: true, id: id },
      attributes: ["id", "nombre", "precio", "descripcion", "stock"],
    }).then((vianda) => {
      if (vianda != null) {
        res.status(200).json({ data: vianda });
      } else {
        res.status(400).json({ message: "No existe la vianda seleccionada" });
      }
    });
  } catch {
    res.status(500).json({ mesage: "Internal server error" });
  }
};

module.exports = {
  create,
  update,
  remove,
  buy,
  list,
  detail,
};
