const model = require("../lib/models");
const Op = require("sequelize").Op;

const create = async (req, res) => {
  const pasaje = req.body;
  console.log(pasaje);
  try {
    const viaje = await model.Viaje.findOne({
      where: { id: pasaje.viajeId, habilitado: true },
    });
    const pasajero = await model.Usuario.findOne({
      where: { id: pasaje.pasajero, tipo: 3 },
    });
    // chequear que pueda realizar la compra, si es que puede hago todo
    const estado = await model.Estado.findOne({
      where: { estado: "Pendiente" },
    });
    if (viaje.asientos_disponibles >= 1) {
      const pasajex = await model.Pasaje.create({
        habilitado: true,
        precio: viaje.precio,
      }).then((response) => {
        viaje.update({ asientos_disponibles: viaje.asientos_disponibles - 1 });
        response.setPasajero(pasajero);
        response.setEstado(estado);
        response.setViaje(viaje);
        res.status(200).json({ data: response });
      });
    } else {
      res.status(400).json({
        message:
          "No hay disponibilidad de asientos para este viaje, por favor elija otro",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const findTravelsForUser = async (req, res) => {
  const { id } = req.params;
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
              model: model.Vianda,
              as: "Vianda",
              attributes: ["id", "nombre"],
            },
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
      res.status(200).json({ data: pasajero });
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
          model: model.Valoracion,
          as: "Valoracion",
          attributes: ["id", "descripcion", "puntuacion"],
        },
        {
          model: model.Usuario,
          as: "Pasajero",
          attributes: ["id", "nombre", "apellido", "email", "dni"],
        },
        {
          model: model.Vianda,
          as: "Vianda",
          attributes: ["id", "nombre", "precio", "descripcion"],
        },
        {
          model: model.Viaje,
          as: "Viaje",
          order: ["fecha_salida"],
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
            },
            {
              model: model.Usuario,
              as: "Chofer",
              attributes: ["id", "nombre", "apellido", "email", "dni"],
            },
            {
              model: model.Ruta,
              as: "Ruta",
              attributes: ["id", "distancia", "duracion", "nombre"],
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const actualizarStock = (viandas, viaje) => {
  for (i = 0; i < viandas.length; i++) {
    viandas[i].update({ stock: viandas[i].stock + 1 });
  }
  viaje.update({ asientos_disponibles: viaje.asientos_disponibles + 1 });
};

//TODO: devolver dinero al usuario, ver que hacer en el sistema
const cancel = async (req, res) => {
  const { id } = req.params;
  try {
    const pasaje = await model.Pasaje.findOne({ where: { id: id } });
    const estado = await pasaje.getEstado();
    if (estado.estado == "Pendiente") {
      const pasajero = await pasaje.getPasajero();
      pasajero.update({ saldo: pasaje.precio + pasajero.saldo });
      const viandas = await pasaje.getVianda();
      const viaje = await pasaje.getViaje();
      pasaje.setEstado(3).then((response) => {
        actualizarStock(viandas, viaje);
        res.status(200).json({ message: "Pasaje Cancelado" });
      });
    } else {
      res.status(400).json({ message: "No se puede realizar accion" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const listUsedTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const pasajes = await model.Usuario.findOne({
      where: { id: id },
      attributes: ["id", "nombre", "apellido", "email"],
      include: [
        {
          model: model.Pasaje,
          as: "Pasaje",
          attributes: ["id", "precio"],
          include: [
            {
              model: model.Valoracion,
              as: "Valoracion",
              attributes: ["id", "detalle", "puntuacion"],
            },
            {
              model: model.Vianda,
              as: "Vianda",
              attributes: ["id", "nombre"],
            },
            {
              model: model.Estado,
              as: "Estado",
              attributes: ["id", "estado"],
              where: { estado: "Finalizado" },
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
    });
    res.status(200).json({ data: pasajes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const ausente = async (req, res) => {
  const { id } = req.params;
  try {
    const pasaje = await model.Pasaje.findOne({
      where: { id: id },
      include: [
        { model: model.Estado, as: "Estado", where: { estado: "Pendiente" } },
      ],
    });
    if (pasaje != null) {
      const estado = await model.Estado.findOne({
        where: { estado: "Ausente" },
      });
      pasaje.setEstado(estado);
      res
        .status(200)
        .json({ message: "Se cambio estado de pasajero a Ausente" });
    } else {
      res.status(400).json({ message: "No se puede cambiar estado" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  create,
  findTravelsForUser,
  remove,
  list,
  cancel,
  listUsedTicket,
  ausente,
  actualizarStock,
};
