"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Viaje extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //TODO: asignarle los id correspondientes
      Viaje.belongsTo(models.Ruta, { foreignKey: "RutaId" });
      Viaje.hasOne(models.Vehiculo, { foreignKey: "ViajeId" });
      Viaje.hasMany(models.Pasaje, { foreignKey: "ViajeId" });
    }
  }
  Viaje.init(
    {
      nombre: DataTypes.STRING,
      fecha_salida: DataTypes.DATEONLY,
      detalle: DataTypes.STRING,
      hora: DataTypes.TIME,
      asientos_disponibles: DataTypes.INTEGER,
      habilitado: DataTypes.BOOLEAN,
      precio: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Viaje",
    }
  );
  return Viaje;
};
