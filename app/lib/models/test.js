"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Test.belongsTo(models.Pasaje, { as: "Pasaje" });
    }
  }
  Test.init(
    {
      temperatura: DataTypes.INTEGER,
      olfato: DataTypes.BOOLEAN,
      contacto_estrecho: DataTypes.BOOLEAN,
      resultado: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Test",
    }
  );
  return Test;
};
