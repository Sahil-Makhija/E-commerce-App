const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const { User } = require("../models/userModel");
const catchError = require("../utils/catchError");
const Response = require("../utils/Response");

const getStats = catchError(async (req, res) => {
  const Res = new Response(res);
  const stats = {
    userCount: await User.count(),
    productCount: await Product.count(),
    ordersPending: await Order.count({ orderStatus: "pending" }),
  };
  return Res.Found({...stats})
});

const getFeaturedProducts = catchError(async(req,res)=>{
  const Res = new Response(res);
  const featuredProducts = await Product.find({featured:true})
  if (featuredProducts){
    return Res.Found({featuredProducts})
  }
  return Res.NotFound("Couldn't find any featured products.")
})

module.exports = {getStats,getFeaturedProducts};
