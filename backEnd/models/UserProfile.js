const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Profile = require("./Profile");

const UserProfile = sequelize.define(
  "UserProfile",
  {
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
  },
  {
    timestamps: false,
  }
);

User.belongsToMany(Profile, {
  through: UserProfile,
  foreignKey: "registration",
  as: "profiles", 
});

Profile.belongsToMany(User, {
  through: UserProfile,
  foreignKey: "id_profile",
  as: "users", 
});

module.exports = UserProfile;
