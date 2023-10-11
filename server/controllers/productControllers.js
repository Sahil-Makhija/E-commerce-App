//*status represents if the response is valid or not

const Product = require("../models/productModel");
const Response = require("../utils/Response");
const catchError = require("../utils/catchError");

const createProduct = catchError(async (req, res) => {
  const Res = new Response(res);
  let existing_product = await Product.findOne({ slug: req.body.slug });
  if (existing_product) {
    return Res.Conflict("Product with this slug already exists!");
  }
  let newProduct = await Product.create(req.body);
  return Res.Created({ newProduct });
});

const findOneProduct = catchError(async (req, res) => {
  const Res = new Response(res);
  let product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    return Res.Found({ product });
  } else {
    return Res.NotFound("Product not found!");
  }
});

const findProductByID = catchError(async (req, res) => {
  const Res = new Response(res);
  let product = await Product.findById(req.params.id);
  if (product) {
    Res.Found({ product });
  } else {
    Res.NotFound("Product not found!");
  }
});

//TODO :  Add Search Functionality
const getAllProduct = catchError(async (req, res) => {
  const Res = new Response(res);
  const limit = req.body.limit || 5;
  const page = req.body.page || 1;
  const skip = (page - 1) * limit;
  let products = await Product.find(req.body.filter).skip(skip).limit(limit);
  if (products && products.length > 0) {
    return Res.Found({ products });
  } else {
    return Res.NotFound("No products were found!");
  }
});

const updateProduct = catchError(async (req, res) => {
  const Res = new Response(res);
  const _id = req.body.productID;
  let updatedProduct = await Product.findByIdAndUpdate(_id, req.body.newData);
  if (updatedProduct) {
    return Res.Updated({ updatedProduct });
  } else {
    return Res.NotFound("Product not found!");
  }
});

const deleteProduct = catchError(async (req, res) => {
  const Res = new Response(res);
  const { _id, slug } = req.body;
  const product = await Product.findOneAndDelete({ _id, slug });
  if (product) {
    return Res.Deleted("Product Deleted Successfully!");
  } else {
    return Res.NotFound("Product not found!");
  }
});

module.exports = {
  createProduct,
  findOneProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  findProductByID,
};
