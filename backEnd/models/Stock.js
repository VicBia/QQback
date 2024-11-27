const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Store = require("./Store");

const Stock = sequelize.define("Stock", {
  id_stock: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_store: {
    type: DataTypes.INTEGER,
    references: {
      model: Store,
      key: "id_store",
    },
    allowNull: false,
  },
  current_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recommended_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  minimum_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Stock.belongsTo(Store, { foreignKey: "id_store" });

module.exports = Stock;
