const model = require("../lib/models");
const Op = require("sequelize").Op;
const jwt = require("jsonwebtoken");
const Membresia = require("../controller/membresia");
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
  try {
    let usuario = await model.Usuario.findOne({
      where: { email: user.email, habilitado: true },
    });
    const membresia = await usuario.getMembresia();
    if (usuario != null) {
      if (user.password === usuario.password) {
        //await Membresia.checkMembership(membresia);
        usuario = await model.Usuario.findOne({
          where: { email: user.email, habilitado: true },
          attributes: [
            "id",
            "email",
            "nombre",
            "apellido",
            "password",
            "dni",
            "tipo",
          ],
          include: [
            {
              model: model.Membresia,
              as: "Membresia",
              attributes: ["id", "activo", "fecha_vencimiento", "descuento"],
            },
          ],
        });
        res.status(200).json({ data: usuario });
      } else {
        res.status(400).json({ error: "Email o contraseña incorrecto" });
      }
    } else {
      res.status(401).json({ error: "Email o contraseña incorrecto" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const Oldlogin = async (req, res) => {
  const user = req.body;
  console.log(user);
  model.Usuario.findOne({
    where: { email: user.email, habilitado: true },
    attributes: [
      "id",
      "email",
      "nombre",
      "apellido",
      "password",
      "dni",
      "tipo",
    ],
    include: [
      {
        model: model.Membresia,
        as: "Membresia",
        attributes: ["id", "activo", "fecha", "descuento"],
      },
    ],
  }).then((response) => {
    try {
      if (response != null) {
        if (user.password === response.password) {
          res.status(200).json({ data: response });
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
      [Op.and]: [
        {
          id: { [Op.ne]: user.id },
          [Op.or]: [{ email: user.email }, { dni: user.dni }],
        },
      ],
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
      saldo: 0,
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
  try {
    const user = await findDuplicates(updatedUser);
    if (user.length > 0) {
      res.status(400).json({
        message:
          "El DNI o email que intenta modificar ya se encuentra registrado",
      });
    } else {
      model.Usuario.update(updatedUser, {
        where: {
          id: updatedUser.id,
        },
      }).then((response) => {
        res.status(200).json({ message: "Usuario modificado correctamente" });
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  try {
    const usuario = await model.Usuario.findOne({
      where: { id: id, habilitado: true },
    });
    if (usuario != null) {
      const tieneViaje = await usuario.getViaje();
      if (tieneViaje.length) {
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
  } catch (err) {
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

const closeAccount = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await model.Usuario.findOne({
      where: { id: id, habilitado: true },
    });
    const pasajes = await user.getPasaje();
    if (await hasPendingTravel(pasajes)) {
      res.status(400).json({
        message:
          "La baja de la cuenta , no se puede generar por que existe pasajes pendientes",
      });
    } else {
      user.update({ habilitado: false }).then((response) => {
        res
          .status(200)
          .json({ message: "La baja de la cuenta se genero con éxito" });
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const hasPendingTravel = async (pasajes) => {
  let result = false;
  for (i = 0; i < pasajes.length; i++) {
    let estado = await pasajes[i].getEstado();
    if (estado.estado == "Pendiente") {
      result = true;
      break;
    }
  }
  return result;
};

const listPassengersTravel = async (req, res) => {
  const { id } = req.params;
  try {
    const viaje = await model.Viaje.findOne({
      where: { id: id, habilitado: true },
      attributes: [
        "id",
        "nombre",
        "precio",
        "fecha_salida",
        "hora",
        "asientos_disponibles",
      ],
      include: [
        {
          model: model.Estado,
          attributes: ["estado"],
          as: "Estado",
        },
        {
          model: model.Pasaje,
          as: "Pasaje",
          attributes: ["id", "precio"],
          include: [
            {
              model: model.Usuario,
              as: "Pasajero",
              attributes: ["id", "nombre", "apellido", "dni"],
            },
            { model: model.Test, as: "Test", attributes: ["resultado"] },
            { model: model.Estado, as: "Estado", attributes: ["estado"] },
          ],
        },
      ],
    }).then((response) => {
      res.status(200).json({ data: response });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ mesage: "Internal Server error" });
  }
};

const myTravels = async (req, res) => {
  const { id } = req.params;
  try {
    const chofer = await model.Usuario.findOne({
      where: { id: id, tipo: 2, habilitado: true },
      attributes: ["id", "nombre", "apellido", "email", "dni"],
      include: [
        {
          model: model.Viaje,
          as: "Viaje",
          attributes: [
            "id",
            "nombre",
            "fecha_salida",
            "hora",
            "detalle",
            "precio",
            "asientos_disponibles",
          ],
          include: [
            {
              model: model.Ruta,
              as: "Ruta",
              attributes: ["id", "nombre", "distancia", "duracion"],
              include: [
                {
                  model: model.Ciudad,
                  as: "Origen",
                  attributes: ["id", "nombre", "cp"],
                  include: [
                    {
                      model: model.Provincia,
                      as: "Provincia",
                      attributes: ["id", "nombre"],
                    },
                  ],
                },
                {
                  model: model.Ciudad,
                  as: "Destino",
                  attributes: ["id", "nombre", "cp"],
                  include: [
                    {
                      model: model.Provincia,
                      as: "Provincia",
                      attributes: ["id", "nombre"],
                    },
                  ],
                },
              ],
            },
            { model: model.Estado, as: "Estado", attributes: ["estado"] },
            {
              model: model.Vehiculo,
              as: "Vehiculo",
              attributes: [
                "id",
                "marca",
                "patente",
                "modelo",
                "asientos",
                "confort",
              ],
            },
          ],
        },
      ],
    }).then((response) => {
      res.status(200).json({ data: response });
    });
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllDrivers,
  register,
  login,
  findUser,
  update,
  remove,
  listPassengers,
  profile,
  listAvailableDriver,
  closeAccount,
  listPassengersTravel,
  myTravels,
};
