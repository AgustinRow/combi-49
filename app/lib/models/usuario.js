"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Usuario.belongsTo(models.Vehiculo, { foreignKey: "vehiculoId" });
      Usuario.hasMany(models.Pasaje, { foreignKey: "UsuarioId" });
    }
  }
  Usuario.init(
    {
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      nombre: DataTypes.STRING,
      apellido: DataTypes.STRING,
      dni: DataTypes.INTEGER,
      tipo: DataTypes.INTEGER,
      habilitado: DataTypes.BOOLEAN,
      vehiculoId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Usuario",
    }
  );
  return Usuario;
};
