const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Talon = require("./Talon");
const User = require("./User");

const Transaction = sequelize.define("Transaction", {
  id_transaction: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  shipment: {
    type: DataTypes.STRING(50),
    unique: true,
  },
  id_talon: {
    type: DataTypes.INTEGER,
    references: {
      model: Talon,
      key: "id_talon",
    },
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(25),
    allowNull: false,
    validate: {
      isIn: [["requested", "canceled", "sent", "delayed", "received"]],
    },
  },
  shipment_transaction: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  expected_time: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  receipt_transaction: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  received_by_registration: {
    type: DataTypes.STRING(10),
    references: {
      model: User,
      key: "registration",
    },
    allowNull: true,
  },
});

Talon.hasMany(Transaction, { foreignKey: "id_talon" });
User.hasMany(Transaction, { foreignKey: "received_by_registration" });
Transaction.belongsTo(Talon, { foreignKey: "id_talon" });
Transaction.belongsTo(User, { foreignKey: "received_by_registration" });

module.exports = Transaction;
