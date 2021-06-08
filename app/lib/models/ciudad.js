"use strict";
const Ruta = require("./ruta");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ciudad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ciudad.hasMany(models.Ruta, { as: "Origen", foreignKey: "origenId" });
      Ciudad.hasMany(models.Ruta, { as: "Destino", foreignKey: "destinoId" });
      Ciudad.belongsTo(models.Provincia, { foreignKey: "provinciaId" });
    }
  }
  Ciudad.init(
    {
      nombre: DataTypes.STRING,
      habilitado: DataTypes.BOOLEAN,
      cp: DataTypes.INTEGER,
      provinciaId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Ciudad",
    }
  );
  return Ciudad;
};
