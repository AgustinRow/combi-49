"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vehiculo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vehiculo.belongsTo(models.Viaje, { foreignKey: "ViajeId" });
      Vehiculo.hasOne(models.Usuario, {
        as: "Chofer",
        foreignKey: "vehiculoId",
      });
    }
  }
  Vehiculo.init(
    {
      patente: DataTypes.STRING,
      asientos: DataTypes.INTEGER,
      modelo: DataTypes.STRING,
      marca: DataTypes.STRING,
      confort: DataTypes.STRING,
      habilitado: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Vehiculo",
    }
  );
  return Vehiculo;
};
