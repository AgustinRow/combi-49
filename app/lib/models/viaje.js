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
      Viaje.belongsTo(models.Ruta, { as: "Ruta", foreignKey: "RutaId" });
      Viaje.belongsToMany(models.Vehiculo, {
        as: "Vehiculo",
        foreignKey: "ViajeId",
        through: "Viaje_Vehiculo",
      });
      Viaje.belongsToMany(models.Usuario, {
        as: "Chofer",
        foreignKey: "ViajeId",
        through: "Viaje_Chofer",
      });
      Viaje.hasMany(models.Pasaje, { as: "Pasaje", foreignKey: "ViajeId" });
      Viaje.belongsTo(models.Estado, {
        as: "Estado",
        foreignKey: "EstadoId",
      });
      Viaje.hasMany(models.Valoracion, {as: "Valoracion"})
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
