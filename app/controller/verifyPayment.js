const model = require("../lib/models");
const Op = require("sequelize").Op;

const approve = async (req, res, next) => {
  const tarjeta = req.header;
  if (!tarjeta) {
    return res
      .status(401)
      .send({ message: "Debe ingresar las credenciales de pago" });
  }
  try {
    //TODO realizar comprobaciones del pago
    console.log("PAGO REALIZADO CON EXITOS");
    next();
  } catch {
    res.status(400).json({ message: "" });
  }
};

module.exports = {
  approve,
};
