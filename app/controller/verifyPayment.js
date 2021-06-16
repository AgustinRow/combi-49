module.exports = async (req, res, next) => {
  const tarjeta = req.header("tarjeta");
  const codigo = req.header("codigo");
  console.log(tarjeta.length);
  if (!tarjeta && !codigo) {
    return res
      .status(401)
      .send({ message: "Debe ingresar las credenciales de pago" });
  }
  try {
    //TODO realizar comprobaciones del pago
    if (tarjeta.length == 16) {
      if (codigo.length == 3) {
        console.log("PAGO REALIZADO CON EXITOS");
        next();
      } else {
        return res.status(400).json({ message: "Codigo de tarjeta invalido" });
      }
    } else {
      return res.status(400).json({ message: "Numero de tarjeta invalido" });
    }
  } catch {
    return res.status(500).json({ message: "Pago Invalido" });
  }
};
