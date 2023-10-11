const mongoose = require('mongoose');
const CheckEmail = require('email-validator')
const Password = require('password-validator')

const schema = new Password()




const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required: [true, "firstName is mandatory!"],
    },
    lastName : {
        type : String,
        required: [true, "lastName is mandatory!"],
    },
    password:{
        type:String,
        required: [true, "password is required!"],
        validate:[
            {
                validator:()=>schema
                .is().min(6)                                   
                .is().max(14)                                  
                .has().uppercase()                              
                .has().lowercase()                              
                .has().digits(2)                               
                .has().not().spaces()                           
                .is().not().oneOf(['Passw0rd', 'Password123']),
                message:'Please choose a stronger password!'
                
            },   
        ]
    },
    phoneNumber:{
        type: Number,
        required:[true],
        minlength:10,
        maxlength:10,
        unique:true
    },
    address:{
        type:String,
        required:[true,'Address is required!']
    },
    email:{
        type:String,
        unique:true,
        validate:[
            {
                validator: (value)=>CheckEmail(value),
                message:'Not a valid email!'
            }
        ]
    },
    cart:{
        type:Array,
        default:[]
    },
    user_id:{
        type: String,
        required: true,
        unique:true
    },
    ordersPending:{
        type:Array,
        required:true
    },
    ordersCompleted:{
        type:Array,
        required:true
    },
    ordersCanceled:{
        type:Array,
        required:true
    },
    wishlist:{
        type:Array,
        required:true
    }

})

const User = mongoose.model('User',userSchema)

module.exports = {User}