"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vianda extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vianda.init(
    {
      nombre: DataTypes.STRING,
      precio: DataTypes.INTEGER,
      descripcion: DataTypes.STRING,
      habilitado: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Vianda",
    }
  );
  return Vianda;
};
