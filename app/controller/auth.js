const model = require("../lib/models");

const isAdmin = async (req, res, next) => {
  const user = req.body;
  model.Usuario.findOne({ where: { id: user.id } }).then((response) => {
    // Solo administrador
    if (response && response.tipo === 1) {
      console.log("Admin:");
      next();
    } else {
      res.status(400).json({ message: "Unauthorized" });
    }
  });
};

module.exports = {
  isAdmin,
};
