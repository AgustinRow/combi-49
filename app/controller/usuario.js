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
    { expiresIn: 120000 }
  );
}
//buscar un usuario
const findUser = async (req, res) => {
  const userId = req.params.id;
  model.Usuario.findOne({ where: { id: userId, tipo: 2 } }).then((response) => {
    try {
      if (response) {
        res.status(200).json({ data: parse(response) });
      } else {
        res.status(402).json({ message: "Bad request." });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
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

          res
            .header("auth-token", token)
            .send({ data: parse(response), token: token });
          //res.json({ data: parse(response) });
          //res.status(200);
        } else {
          res
            .status(400)
            .json({ message: "Contraseña invalida" });
        }
      } else {
        res.status(401).json({ message: "El usuario no se encuentra habilitado" });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Email no regisrado" });
    }
  });
};
//listar choferes
const getAllDrivers = async (req, res) => {
  try {
    model.Usuario.findAll({ where: { habilitado: true, tipo: 2 } }).then(
      (response) => {
        res.json({ data: parseUsersData(response) });
        res.status(200);
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Internal Server error" });
  }
  function parseUsersData(users) {
    var result = [];
    users.forEach((element) => {
      result.unshift(element);
    });

    return result;
  }
};

const parse = (user) => {
  return {
    id: user.id,
    email: user.email,
    nombre: user.nombre,
    apellido: user.apellido,
    password: user.password,
    dni: user.dni,
    tipo: user.tipo,
  };
};

const findDuplicates = async (user) => {
  return model.Usuario.findAll({
    where: {
      [Op.or]: [{ email: user.email }, { dni: user.dni }],
    },
  });
};
//registrar usuario
const register = async (req, res) => {
  const user = req.body;
  try {
    model.Usuario.findAll({
      where: {
        [Op.or]: [{ email: user.email }, { dni: user.dni }],
      },
    }).then((response) => {
      console.log(response);
      if (response.length) {
        res.status(400).json({
          message: "El usuario ya existe, ingrese otro email o dni",
        });
      } else {
        createUser(user);
      }
    });
  } catch (err) {
    res.status(500).json({ data: "Internal server error" });
  }

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
        res.status(400).json({ message: "Bad request" });
      }
    });
  }
};
//modificar chofer
const updateDriver = async (req, res) => {
  const updatedUser = req.body;
  const oldUser = await findDuplicates(updatedUser).then((response) => {
    try {
      return response[0].dataValues;
    } catch {
      res
        .status(400)
        .json({ message: "El usuario que intenta modificar no existe" });
    }
  });
  if (oldUser.id == updatedUser.id) {
    model.Usuario.update(updatedUser, {
      where: {
        id: updatedUser.id,
      },
    }).then((response) => {
      try {
        res.status(201).json({ data: updatedUser });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      }
    });
  } else {
    if (oldUser.email === updatedUser.email) {
      res.status(401).json({ message: "El e-mail ya se encuentra registrado" });
    }
    if (oldUser.dni === updatedUser.dni) {
      res.status(401).json({ message: "El DNI ya se encuentra registrado" });
    }
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  model.Usuario.findOne({ where: { id: id } }).then((response) => {
    try {
      if (response.dataValues.habilitado) {
        model.Usuario.update(
          {
            habilitado: false,
          },
          {
            where: { id: id },
          }
        ).then((response) => {
          res.status(200).json({ message: "removed" });
        });
      } else {
        res.status(400).json({ message: "Este usuario no existe" });
      }
    } catch (err) {
      res.status(400).json({ message: "Bad Request" });
    }
  });
};

module.exports = {
  getAllDrivers,
  register,
  login,
  findUser,
  updateDriver,
  remove,
};
