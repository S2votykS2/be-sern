"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctorinfor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User
      Doctorinfor.belongsTo(models.User, {
        foreignKey: "doctorId",
        as: "DoctorInfoData",
      });
      // Allcode
      Doctorinfor.belongsTo(models.Allcode, {
        foreignKey: "priceId",
        targetKey: "keyMap",
        as: "priceData",
      });
      Doctorinfor.belongsTo(models.Allcode, {
        foreignKey: "paymentId",
        targetKey: "keyMap",
        as: "paymentData",
      });
      Doctorinfor.belongsTo(models.Allcode, {
        foreignKey: "provinceId",
        targetKey: "keyMap",
        as: "provinceData",
      });
    }
  }
  Doctorinfor.init(
    {
      doctorId: DataTypes.INTEGER,
      priceId: DataTypes.TEXT,
      provinceId: DataTypes.TEXT,
      paymentId: DataTypes.TEXT,
      addressClinic: DataTypes.TEXT,
      nameClinic: DataTypes.TEXT,
      note: DataTypes.TEXT,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Doctorinfor",
    }
  );
  return Doctorinfor;
};
