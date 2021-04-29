const { Unauthorized } = require("http-errors");
const model = require("../lib/models");

const getAllUsers = async (req, res) => {
  model.Usuario.findAll().then((response) => {
    try {
      console.log("usuarios all");
      res.json({ data: response });
      res.status(200);
    } catch {
      res.status(400);
      res.json({ message: "Unauthorized" });
    }
  });
};

const addUser = async (req, res) => {
  const user = req.body;
  model.Usuario.create({
    username: user.username,
    password: user.password,
    email: user.email,
    nombre: user.nombre,
    apellido: user.apellido,
    dni: user.dni,
    tipo: user.tipo,
    habilitado: true,
  }).then(() => {
    try {
      res.json("Usuario agregado exitosamente", 200);
      model.Usuario.save();
    } catch (err) {
      res.status(400);
    }
  });
};

module.exports = {
  getAllUsers,
  addUser,
};
