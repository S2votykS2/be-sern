"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Insurance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Insurance.belongsTo(models.User, {
      //   foreignKey: "doctorId",
      //   as: "InsuranceData",
      // });
      // Insurance.hasMany(models.User, {
      //   foreignKey: "insuranceId",
      //   as: "InsuranceData",
      // });
    }
  }
  Insurance.init(
    {
      doctorId: DataTypes.INTEGER,
      nameInsurance: DataTypes.TEXT,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Insurance",
    }
  );
  return Insurance;
};
