"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Membresia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Membresia.belongsTo(models.Usuario, { as: "Usuario" });
    }
  }
  Membresia.init(
    {
      fecha: DataTypes.DATE,
      activo: DataTypes.BOOLEAN,
      descuento: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Membresia",
    }
  );
  return Membresia;
};
