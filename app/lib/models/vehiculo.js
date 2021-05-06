'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehiculo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Vehiculo.init({
    patente: DataTypes.STRING,
    asientos: DataTypes.INTEGER,
    modelo: DataTypes.STRING,
    marca: DataTypes.STRING,
    confort: DataTypes.STRING,
    unidad: DataTypes.INTEGER,
    habilitado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Vehiculo',
  });
  return Vehiculo;
};