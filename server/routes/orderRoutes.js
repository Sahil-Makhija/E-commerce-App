const express = require('express');
const router = express.Router()
const {createNewOrder, cancelOrder} = require('../controllers/orderControllers');

router.post('/user/order/new',createNewOrder)

router.post('/user/order/cancel',cancelOrder)

module.exports = router