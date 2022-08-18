const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('friendships', {
    person1Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      person2Id:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  });
};
