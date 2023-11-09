const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
} = require("../controllers/productControllers");

const express = require("express");
const {getStats} = require("../controllers/miscControllers");
const { getAllOrders, cancelOrder, updateOrderStatus } = require("../controllers/orderControllers");
const { getAllUsers, deleteUser } = require("../controllers/userControllers");
const { createAdmin, getAdminData, getAuthQues } = require("../controllers/adminControllers" );
const router = express.Router();


//Create Product
router.post('/product/new',createProduct)

//Read all product
router.post("/products/all",getAllProduct);

// Update Product
router.post('/product/update',updateProduct)

//Delete Product
router.delete('/product/delete',deleteProduct)


//get All Users
router.get('/users/all', getAllUsers)

// Delete User (AdminAction)
router.delete('/user/delete/:id', deleteUser)

//get All Orders
router.get('/orders/all', getAllOrders)

//Cancel Order
router.post('/order/cancel',cancelOrder)

//Update Order(Status)
router.post('/order/update',updateOrderStatus)

//getStaticalData
router.get('/stats', getStats)

//get Admin Data
router.post('/retrieve', getAdminData)

//Create Admin
router.post('/create', createAdmin)

//get Auth Question
router.post('/auth-ques', getAuthQues)

module.exports = router;
