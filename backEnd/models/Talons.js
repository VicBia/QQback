const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Store = require("./Store");

const Talons = sequelize.define("Talons", {
  id_talon: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  talon_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  requester_registration: {
    type: DataTypes.STRING(10),
    references: {
      model: User,
      key: "registration",
    },
    allowNull: false,
  },
  id_store: {
    type: DataTypes.INTEGER,
    references: {
      model: Store,
      key: "id_store",
    },
    allowNull: false,
  },
});

module.exports = Talons;
