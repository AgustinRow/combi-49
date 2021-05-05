const model = require("../lib/models");
const Op = require("sequelize").Op;

const findUser = async (req, res) => {
  const user = req.body;
  model.Usuario.findOne({ where: { username: user.username } }).then(
    (response) => {
      try {
        if (response) {
          res.status(200).json({ data: parse(response) });
        } else {
          res.status(402).json({ error: "Bad request." });
        }
      } catch (err) {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  );
};

const findUserForLogIn = async (req, res) => {
  const user = req.body;
  model.Usuario.findOne({ where: { email: user.email } }).then((response) => {
    try {
      if (response.habilitado) {
        if (user.password === response.password) {
          res.json({ data: parse(response) });
          res.status(200);
        } else {
          res
            .status(400)
            .json({ error: "Bad request. Incorrect email or passowrd" });
        }
      } else {
        res.status(401).json({ error: "Not Found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
};

// TODO: agregar oauth token para autenticacion
const getAllUsers = async (req, res) => {
  try {
    const userId = req.params.id;
    mode.Usuario.findOne({ where: { id: userId } }).then((response) => {
      // Solo administrador
      if (response.tipo === 1) {
        model.Usuario.findAll({ where: { habilitado: true } }).then(
          (response) => {
            res.json({ data: parseUsersData(response) });
            res.status(200);
          }
        );
      } else {
        res.status(400).json({ message: "Unauthorized" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server error" });
  }
  function parseUsersData(users) {
    var result = [];
    users.forEach((element) => {
      result.unshift(parse(element));
    });

    return result;
  }
};
const parse = (user) => {
  return {
    email: user.email,
    username: user.username,
    nombre: user.nombre,
    apellido: user.apellido,
    dni: user.dni,
    tipo: user.tipo,
  };
};

//TODO: agregar oauth token para autenticacion
const addUser = async (req, res) => {
  const user = req.body;
  model.Usuario.findAll({
    where: {
      [Op.or]: [
        { username: user.username },
        { email: user.email },
        { dni: user.dni },
      ],
    },
  }).then((response) => {
    try {
      if (response.length) {
        res.status(400).json({
          data: "Bad request. This user already exist",
        });
      } else {
        createUser(user);
      }
    } catch (err) {
      res.status(500).json({ data: "Internal server error" });
    }
  });

  function createUser(user) {
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
        res.status(201).json({ data: parse(user) });
      } catch (err) {
        console.log(err);
        res.status(500).json({ data: "Internal server error" });
      }
    });
  }
};

module.exports = {
  getAllUsers,
  addUser,
  findUserForLogIn,
  findUser,
};
