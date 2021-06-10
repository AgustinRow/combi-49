const model = require("../lib/models");
const Op = require("sequelize").Op;

const create = async (req, res) => {
  const pasaje = req.body;
  try {
    const viaje = await model.Viaje.findOne({
      where: { id: pasaje.viaje, habilitado: true },
    });
    const pasajero = await model.Usuario.findOne({
      where: { id: pasaje.pasajero, tipo: 3 },
    });
    if (pasaje.insumo) {
      const insumo = await model.Insumo.findOne({
        where: { id: pasaje.insumo },
      });
    }
    // chequear que pueda realizar la compra, si es que puede hago todo
    const estado = await model.Estado.findOne({
      where: { estado: "Pendiente" },
    });
    //let precio = viaje.precio;
    //if (pasaje.insumo) {
    //  precio += pasaje.insumo;
    //}

    const pasajex = await model.Pasaje.create({
      habilitado: true,
      precio: pasaje.precio,
    }).then((response) => {
      response.setPasajero(pasajero);
      response.setEstado(estado);
      response.setViaje(viaje);
      res.status(200).json({ data: response });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const findTravelsForUser = async (req, res) => {
  const { id } = req.query;
  try {
    model.Usuario.findOne({
      where: { id: id, tipo: 3, habilitado: true },
      attributes: ["id", "email", "nombre", "apellido", "dni"],
      include: [
        {
          model: model.Pasaje,
          as: "Pasaje",
          attributes: ["id", "precio"],
          include: [
            {
              model: model.Estado,
              as: "Estado",
              attributes: ["id", "estado"],
            },
            {
              model: model.Viaje,
              as: "Viaje",
              order: ["fecha_salida"],
              attributes: [
                "id",
                "nombre",
                "fecha_salida",
                "hora",
                "detalle",
                "asientos_disponibles",
                "precio",
              ],
              include: [
                {
                  model: model.Estado,
                  as: "Estado",
                  attributes: ["id", "estado"],
                },
                {
                  model: model.Ruta,
                  as: "Ruta",
                  attributes: ["id", "distancia", "duracion"],
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
              ],
            },
          ],
        },
      ],
    }).then((pasajero) => {
      res.status(200).json({ pasajero: pasajero });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server error" });
  }
};
//TODO
const remove = async (req, res) => {};
const list = async (req, res) => {
  try {
    model.Pasaje.findAll({
      where: { habilitado: true },
      attributes: ["id", "precio"],
      include: [
        { model: model.Estado, as: "Estado", attributes: ["id", "estado"] },
        {
          model: model.Viaje,
          as: "Viaje",
          order: ["fecha_salida"],
          where: { habilitado: true },
          attributes: [
            "id",
            "nombre",
            "fecha_salida",
            "detalle",
            "hora",
            "asientos_disponibles",
            "precio",
          ],
          include: [
            {
              model: model.Estado,
              as: "Estado",
              attributes: ["id", "estado"],
            },
            {
              model: model.Vehiculo,
              as: "Vehiculo",
              attributes: [
                "id",
                "patente",
                "asientos",
                "modelo",
                "marca",
                "confort",
              ],
              include: [
                {
                  model: model.Usuario,
                  as: "Chofer",
                  attributes: ["id", "nombre", "apellido", "email", "dni"],
                },
              ],
            },
            {
              model: model.Ruta,
              as: "Ruta",
              attributes: ["id", "distancia", "duracion"],
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
          ],
        },
      ],
    }).then((pasajes) => {
      res.status(200).json({ pasajes: pasajes });
    });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  create,
  findTravelsForUser,
  remove,
  list,
};
