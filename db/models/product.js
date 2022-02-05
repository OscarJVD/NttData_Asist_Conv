'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(
      // { Product, Image, Feature, Category }
    ) {
      // Product.hasMany(Image)
      // Product.hasMany(Feature)
      // Product.belongsToMany(Category, { through: "products_categories" })
    }
  };
  Product.init({
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    desc: DataTypes.STRING,
    content: DataTypes.STRING,
    // image: DataTypes.INTEGER,
    weight: DataTypes.STRING,
    dimensions: DataTypes.STRING,
    checked: DataTypes.BOOLEAN,
    inStock: DataTypes.INTEGER,
    sold: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};