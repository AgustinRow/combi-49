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
      //Ruta.hasOne(models.Origen, { foreignKey: "id" });
      Ruta.belongsTo(models.Ciudad, { as: 'Destino', foreignKey: "destino_id" });
      Ruta.belongsTo(models.Ciudad, { as: 'Origen', foreignKey: "origen_id" });
    }
  }
  Ruta.init(
    {
      nombre: DataTypes.STRING,
      distancia: DataTypes.INTEGER,
      habilitado: DataTypes.BOOLEAN,
      origen_id: DataTypes.INTEGER,
      destino_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Ruta",
    }
  );
  return Ruta;
};
