const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:[true,'fullName is mandatory']
    },
    phoneNumber:{
        type:String,
        required:[true,'Phone Number is required~ ']
    },
    expectedDeliveryDate:{
        type:Date,
    },
    user_id:{
        required:[true,'user id is mandatory'],
        type:String
    },
    orderItems:{
        required:[true, 'list of items is mandatory'],
        type:Array
    },
    address:{
        required:[true, 'Shipping Address is mandatory'],
        type:String
    },
    modeOfPayment:{
        required:[true, 'Payment Method is mandatory'],
        type:String
    },
    orderDate:{
        required:[true, 'Order Date is mandatory'],
        type:String
    },
    orderStatus:{
        default:"PENDING",
        type:String
    },
    orderAmount:{
        type:Number,
        required:[true,'amt paid is required!']
    },
    isPaid:{
        type:Boolean,
        default:false
    }
})

const Order = mongoose.model('Order',orderSchema)

module.exports = Order