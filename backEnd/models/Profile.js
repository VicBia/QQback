const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Profile = sequelize.define(
  "Profile",
  {
    id_profile: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    profile_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.ARRAY(
        DataTypes.ENUM(
          "justStore",
          "dashboard",
          "users",
          "profile",
          "store",
          "stock",
          "send",
          "receive",
          "maintenance",
          "reports"
        )
      ),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Profile;
