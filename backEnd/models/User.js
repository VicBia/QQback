const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Store = require("./Store");

const User = sequelize.define("User", {
  registration: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    allowNull: false,
  },
  user_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(150),
    unique: true,
    allowNull: false,
  },
  user_password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  id_store: {
    type: DataTypes.INTEGER,
    references: {
      model: Store,
      key: "id_store",
    },
  },
  registration_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

Store.hasMany(User, { foreignKey: "id_store" });

module.exports = User;
