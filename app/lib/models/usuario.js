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
      //Usuario.belongsTo(models.Vehiculo, { foreignKey: "vehiculoId" });
      Usuario.hasMany(models.Pasaje, { as: "Pasaje", foreignKey: "UsuarioId" });
      Usuario.belongsToMany(models.Viaje, {
        as: "Viaje",
        foreignKey: "UsuarioId",
        through: "Viaje_Chofer",
      });
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
      saldo: DataTypes.INTEGER,
      habilitado: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Usuario",
    }
  );
  return Usuario;
};
