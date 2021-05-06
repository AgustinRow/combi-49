const model = require("../lib/models");
const Op = require("sequelize").Op;
const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: 1200 }
  );
}
//buscar un usuario
const findUser = async (req, res) => {
  const user = req.body;
  model.Usuario.findOne({ where: { email: user.email } }).then((response) => {
    try {
      if (response) {
        res.status(200).json({ data: parse(response) });
      } else {
        res.status(402).json({ error: "Bad request." });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
};

const login = async (req, res) => {
  const user = req.body;
  model.Usuario.findOne({ where: { email: user.email } }).then((response) => {
    try {
      if (response.habilitado) {
        if (user.password === response.password) {
          const token = jwtToken(response);

          res.header("auth-token", token).send({ data: parse(response) });
          //res.json({ data: parse(response) });
          //res.status(200);
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
//listar choferes
const getAllDrivers = async (req, res) => {
  try {
    const userId = req.params.id;
    model.Usuario.findOne({ where: { id: userId } }).then((response) => {
      // Solo administrador
      if (response && response.tipo === 1) {
        model.Usuario.findAll({ where: { habilitado: true, tipo: 2 } }).then(
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
    id: user.id,
    email: user.email,
    username: user.username,
    nombre: user.nombre,
    apellido: user.apellido,
    dni: user.dni,
    tipo: user.tipo,
  };
};

const findDuplicates = async (user) => {
  return model.Usuario.findAll({
    where: {
      [Op.or]: [
        { username: user.username },
        { email: user.email },
        { dni: user.dni },
      ],
    },
  });
};
//registrar usuario
const register = async (req, res) => {
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
        res.status(201).json({ created: parse(user) });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      }
    });
  }
};
//modificar chofer
consgitt updateDriver = async (req, res) => {
  const updatedUser = parse(req.body);
  const oldUser = await findDuplicates(updatedUser).then(
    (response) => response[0].dataValues
  );
  console.log(oldUser.id);
  if (oldUser.id == updatedUser.id) {
    model.Usuario.update(updatedUser, {
      where: {
        id: updatedUser.id,
      },
    }).then((response) => {
      try {
        res.status(201).json({ created: parse(response) });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      }
    });
  } else {
    if (oldUser.email === updatedUser.email) {
      res.status(401).json({ message: "This email already exist" });
    }
    if (oldUser.dni === updatedUser.dni) {
      res.status(401).json({ message: "This DNI already exist" });
    }
    if (oldUser.username === updatedUser.username) {
      res.status(401).json({ message: "This username already exist" });
    }
  }
};

module.exports = {
  getAllDrivers,
  register,
  login,
  findUser,
  updateDriver,
};
