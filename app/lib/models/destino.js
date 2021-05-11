"use strict";
const model = require("../models");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Destino extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //Destino.belongsTo(models.Ciudad, { foreignKey: "ciudad_id" });
    }
  }
  Destino.init(
    {
      ruta: DataTypes.INTEGER,
      ciudad: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Destino",
    }
  );
  return Destino;
};
