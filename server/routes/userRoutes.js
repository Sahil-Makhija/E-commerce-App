const express = require('express');
const router = express.Router()
const { findOneProduct, findProductByID, getAllProduct } = require('../controllers/productControllers');
const { createUser, loginUser, deleteUser, updateUser } = require('../controllers/userControllers')


router.get('/product/:slug',findOneProduct)
router.get('/product/id/:id',findProductByID)

//for product search & filter
router.get('/get/product', getAllProduct)

//*user signup
router.post('/user/signup', createUser)

//*user login
router.post('/user/login', loginUser)

//*user delete
router.delete('/user/delete/:id', deleteUser)

//*user update
router.post('/user/update',updateUser)

//*user update (password)
router.post('/user/update/password', updateUser) 



module.exports = router