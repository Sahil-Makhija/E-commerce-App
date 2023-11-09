const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const { User } = require("../models/userModel");
const Response = require("../utils/Response");
const catchError = require("../utils/catchError");
const checkItems = require("../utils/checkItems");

const createNewOrder = catchError(async (req, res) => {
  const Res = new Response(res);

  //Verify Received Items
  const { productArray: orderItems, totalAmt: orderAmount } = await checkItems(
    req.body.orderItems
  );

  if (orderItems && orderItems.length > 0) {
    const { user_id, modeOfPayment } = req.body;
    //Get Necessary User Details
    const user = await User.findById(user_id).select(
      "name phoneNumber address"
    );
    const { name: fullName, phoneNumber, address } = user;
    const orderDate = new Date();
    const expectedDeliveryDate = new Date(orderDate);
    expectedDeliveryDate.setDate(orderDate.getDate() + 3);
    //Create Order
    const newOrder = await Order.create({
      fullName,
      phoneNumber,
      expectedDeliveryDate,
      orderDate,
      orderAmount,
      orderItems,
      user_id,
      address,
      modeOfPayment,
    });
    if (newOrder) {
      await Promise.all(orderItems.map(async(item)=>{
        await Product.findByIdAndUpdate(item._id, {
          $inc: { stock: -(item.qty || 1) },
        }); 
      }))
      await User.findByIdAndUpdate(user_id, {
        $push: { ordersPending: newOrder._id },
      });
    }
    return Res.Created({ newOrder });
  } else {
    return Res.BadRequest("Couldn't place your order. Try again later!");
  }
});

const updateOrder = {
  PENDING: "SHIPPED",
  SHIPPED: "DELIVERED",
};

const updateOrderStatus = catchError(async (req, res) => {
  const Res = new Response(res);
  const { order_id } = req.body;
  let currentStatus = await Order.findById(order_id).select("orderStatus")
    .orderStatus;
  if (currentStatus) {
    return await Order.findByIdAndUpdate(
      order_id,
      { orderStatus: updateOrder[currentStatus] },
      { new: true }
    )
      .select("orderStatus")
      .then((res) => {
        return Res.Updated({ orderStatus: res.orderStatus });
      });
  } else {
    Res.BadRequest("Order not found!");
  }
});

const cancelOrder = catchError(async (req, res) => {
  const Res = new Response(res);
  const { order_id } = req.body;
  let updated_order = await Order.findByIdAndUpdate(
    order_id,
    { orderStatus: "CANCELLED" },
    { new: true }
  );
  if (updated_order && updated_order.orderStatus === "CANCELLED") {
    Res.Deleted("This Order was cancelled!");
  } else {
    Res.BadRequest("Order not found. Try again later!");
  }
});

const getAllOrders = catchError(async (req, res) => {
  const Res = new Response(res);
  const limit = req.body.limit || 5;
  const page = req.body.page || 1;
  const skip = (page - 1) * limit;
  let orders = await Order.find(req.body.filter).skip(skip).limit(limit);
  if (orders && orders.length > 0) {
    return Res.Found({ orders });
  } else {
    return Res.NotFound("No orders were found!");
  }
});

module.exports = {
  createNewOrder,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
};
