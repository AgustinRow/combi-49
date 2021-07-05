const model = require("../lib/models");
const Op = require("sequelize").Op;

const create = async (req, res) => {
  const { body } = req;
  try {
    /* const timeElapsed = Date.now();
    let today = new Date(timeElapsed);
      */
    const user = await model.Usuario.findOne({
      where: { id: body.usuarioId, habilitado: true, tipo: 3 },
      include: [{ model: model.Membresia, as: "Membresia" }],
    });
    const date = new Date();
    let vencimiento = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
    if (user.Membresia != null) {
      if (user.Membresia.activo) {
        res
          .status(400)
          .json({ message: "El usuario ya tiene membresia contratada" });
      } else {
        user.Membresia.update({
          activo: true,
          fecha_vencimiento: vencimiento,
        }).then((response) => {
          res.status(200).json({ message: "Membresia actualizada" });
        });
      }
    } else {
      model.Membresia.create({
        activo: true,
        descuento: 10,
        UsuarioId: body.usuarioId,
        fecha_vencimiento: vencimiento,
      }).then((response) => {
        res.status(200).json({ message: "Membresia contratada" });
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const cancel = async (req, res) => {
  const { body } = req;
  try {
    const user = await model.Usuario.findOne({
      where: { id: body.usuarioId, habilitado: true },
    });
    const membresia = await user.getMembresia();
    membresia.update({ activo: false }).then((response) => {
      res.status(200).json({ message: "Membresia cancelada" });
    });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkMembership = async (membresia) => {
  try {
    const date = new Date();
    if (date >= membresia.fecha_vencimiento) {
      await membresia.update({ activo: false });
      return false;
    } else {
      return true;
    }
  } catch (err) {
    return err;
  }
};

//Debe reiniciar la fecha de la membresia
const update = async (req, res) => {};

module.exports = { create, cancel, checkMembership };
