const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    adminName: {
        type: String,
        required: [true, 'this is a mandatory field!'],
        unique:true
    },
    adminPassword: {
        type: String,
        required: [true, 'this is a mandatory field!'],
    },
    admin_id: {
        type: String,
        required:true,
        unique:true
    }
    ,
    authQuestion: {
        type: String,
        required: [true,'Auth Question is required!']
    },
    authAnswer :{
        type:String,
        required:[true,'Answer the question!']
    }
})

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin 