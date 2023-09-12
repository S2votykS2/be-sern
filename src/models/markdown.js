'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Markdown extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Markdown.belongsTo(models.User, { foreignKey: "doctorId", as: 'MarkdownData' })
                // User.hasOne(models.Markdown, { foreignKey: "id", as: 'MarkdownData' })

        }
    };
    Markdown.init({
        contentHTML: DataTypes.TEXT,
        contentMarkdown: DataTypes.TEXT,
        description: DataTypes.TEXT,
        doctorId: DataTypes.NUMBER,
        specialityId: DataTypes.NUMBER,
        clinicId: DataTypes.NUMBER
    }, {
        sequelize,
        modelName: 'Markdown',
    });
    return Markdown;
};