'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bridge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bridge.init({
    atpo_id: DataTypes.INTEGER,
    exapro_pt_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bridge',
  });
  return Bridge;
};