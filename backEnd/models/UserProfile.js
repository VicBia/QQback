const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Profile = require("./Profile");

const UserProfile = sequelize.define("UserProfile", {
  registration: {
    type: DataTypes.STRING(10),
    references: {
      model: User,
      key: "registration",
    },
    primaryKey: true,
  },
  id_profile: {
    type: DataTypes.INTEGER,
    references: {
      model: Profile,
      key: "id_profile",
    },
    primaryKey: true,
  },
  association_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

User.belongsToMany(Profile, {
  through: UserProfile,
  foreignKey: "registration",
});
Profile.belongsToMany(User, { through: UserProfile, foreignKey: "id_profile" });

module.exports = UserProfile;
