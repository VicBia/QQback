const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Store = sequelize.define("Store", {
  id_store: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  store_number: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
  },
  store_name: {
    type: DataTypes.STRING(70),
    unique: true,
    allowNull: false,
  },
});

module.exports = Store;
