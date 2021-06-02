'use strict';
const {
  Model
} = require('sequelize');
const viaje = require('./viaje');
module.exports = (sequelize, DataTypes) => {
  class Pasaje extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pasaje.belongsTo(models.Estado)
    }
  };
  Pasaje.init({
    habilitado: DataTypes.BOOLEAN,
    precio: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Pasaje',
  });
  return Pasaje;
};