"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Valoracion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Valoracion.belongsTo(models.Pasaje, { as: "Pasaje" });
      Valoracion.belongsTo(models.Viaje, { as: "Viaje" });
    }
  }
  Valoracion.init(
    {
      descripcion: DataTypes.STRING,
      puntuacion: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Valoracion",
    }
  );
  return Valoracion;
};
