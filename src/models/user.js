"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Allcode, {
        foreignKey: "gender",
        targetKey: "keyMap",
        as: "genderData",
      });
      User.belongsTo(models.Allcode, {
        foreignKey: "positionId",
        targetKey: "keyMap",
        as: "positionData",
      });
      User.belongsTo(models.Allcode, {
        foreignKey: "roleId",
        targetKey: "keyMap",
        as: "roleData",
      });

      // User.belongsTo(model.Markdown, { foreignKey: "id", as: "MarkdownData" })
      User.hasOne(models.Markdown, {
        foreignKey: "doctorId",
        targetKey: "id",
        as: "MarkdownData",
      });
      User.hasOne(models.Doctorinfor, {
        foreignKey: "doctorId",
        targetKey: "id",
        as: "DoctorInfoData",
      });
      // User.hasOne(models.Insurance, {
      //   foreignKey: "doctorId",
      //   targetKey: "InsuranceId",
      //   as: "InsuranceData",
      // });
      // User.belongsTo(models.Insurance, {
      //   foreignKey: "insuranceId",
      //   targetKey: "doctorId",
      //   as: "InsuranceData",
      // });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      gender: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      roleId: DataTypes.STRING,
      positionId: DataTypes.STRING,
      image: DataTypes.BLOB,
      insuranceId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
