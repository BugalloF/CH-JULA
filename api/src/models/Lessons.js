const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('lessons', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    personId:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  });
};
