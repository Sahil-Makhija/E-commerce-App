const mongoose = require('mongoose');
const { productCategory } = require('../constants');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Please Enter product Name"],
        trim: true,
    },
    productDescription: {
        type: String,
    },
    productMRP: {
        type: Number,
        required: [true, "Please Enter product M.R.P."],
        maxLength: [8, "Price cannot exceed 8 characters"],
    },
    productSP: {
        type: Number,
        required: [true, "Please Enter product S.P."],
        maxLength: [8, "Price cannot exceed 8 characters"],
    },
    images: {
        type: Array
    },
    highlights: {
        type: Array
    },
    productCategory: {
        type: String,
        required: [true, "Please Enter Product Category"],
        enum: productCategory
    },
    stock: {
        type: Number,
        required: [true, "Please Enter product Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 10,
    },
    slug:{
        type: String,
        trim:true,
        required:[true,'Product Slug is required!']
    },
    Featured:{
        type:Boolean,
        default:false
    },
    Archived:{
        type:Boolean,
        default:false
    },
})


const Product = mongoose.model('Product',productSchema)

module.exports = Product