const mongoose = require('mongoose');

/*
  If you don't know the number of properties and specifications for each robot, using an object type for properties and specifications in the productModel schema might not be the best option.

Instead, you could consider creating separate schemas for properties and specifications and then referencing them in the productModel schema. For example:
 */

const propertySchema = mongoose.Schema({
  name: String,
  value: String,
});

const specificationSchema = mongoose.Schema({
  name: String,
  value: String,
});

const productModel = mongoose.Schema(
  {
    name: {
      type: String,
    },
    heading: {
      type: String,
    },
    description: {
      type: String,
    },
    properties: [propertySchema],
    specifications: [specificationSchema],
  },
  { collection: 'EpikWeb_Products' }
);

const Product = mongoose.model('Product', productModel);

module.exports = Product;
