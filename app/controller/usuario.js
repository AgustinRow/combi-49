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
        res.status(402).json({ error: "Bad request." });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
};

const login = async (req, res) => {
  const user = req.body;
  model.Usuario.findOne({
    where: { email: user.email, habilitado: true },
  }).then((response) => {
    try {
      if (response != null) {
        if (user.password === response.password) {
          const token = jwtToken(response);

          res
            .header("auth-token", token)
            .send({ data: parse(response), token: token });
          //res.json({ data: parse(response) });
          //res.status(200);
        } else {
          res.status(400).json({ error: "Email o contraseña incorrecto" });
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
    model.Usuario.findAll({ where: { habilitado: true, tipo: 2 } }).then(
      (response) => {
        res.json({ data: parseUsersData(response) });
        res.status(200);
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

function parseUsersData(users) {
  var result = [];
  users.forEach((element) => {
    result.unshift(element);
  });

  return result;
}

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
const update = async (req, res) => {
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
  try {
    const usuario = await model.Usuario.findOne({
      where: { id: id, habilitado: true },
    });
    if (usuario != null) {
      const hasVehiculo = await usuario.getVehiculo();
      if (hasVehiculo != null) {
        res.status(400).json({
          message: "No se puede eliminar chofer con viaje pendiente",
        });
        return;
      }
      model.Usuario.update(
        {
          habilitado: false,
        },
        {
          where: { id: id },
        }
      ).then((response) => {
        res.status(200).json({ message: "Usuario eliminado exitosamente" });
      });
    } else {
      res.status(400).json({ message: "Este usuario no existe" });
    }
  } catch {
    res.status(500).json({ message: "Internal Server error" });
  }
};

const listPassengers = async (req, res) => {
  try {
    model.Usuario.findAll({ where: { habilitado: true, tipo: 3 } }).then(
      (response) => {
        res.json({ data: response });
        res.status(200);
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

const profile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await model.Usuario.findOne({
      where: { id: id, habilitado: true },
    });
    if (user != null) {
      res.status(200).json({ data: user });
    }
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

const listAvailableDriver = async (req, res) => {
  try {
    model.Usuario.findAll({
      where: { tipo: 2, habilitado: true, vehiculoId: null },
      attributes: ["id", "nombre", "email", "apellido"],
    }).then((response) => {
      res.status(200).json({ data: response });
    });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

//TODO: implementar el recuperar contraseñ
const recoverPassword = async (req, res) => {};

module.exports = {
  getAllDrivers,
  register,
  login,
  findUser,
  update,
  remove,
  listPassengers,
  profile,
  recoverPassword,
  listAvailableDriver,
};
