"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Estado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Estado.hasOne(models.Pasaje);
    }
  }
  Estado.init(
    {
      estado: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Estado",
    }
  );
  return Estado;
};
