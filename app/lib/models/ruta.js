"use strict";
const model = require("../models");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ruta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ruta.belongsTo(models.Ciudad, { as: "Origen", foreignKey: "origenId" });
      Ruta.belongsTo(models.Ciudad, { as: "Destino", foreignKey: "destinoId" });
      Ruta.hasMany(models.Viaje, { foreignKey: "RutaId" });
    }
  }
  Ruta.init(
    {
      nombre: DataTypes.STRING,
      distancia: DataTypes.INTEGER,
      habilitado: DataTypes.BOOLEAN,
      origenId: DataTypes.INTEGER,
      destinoId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Ruta",
    }
  );
  return Ruta;
};
