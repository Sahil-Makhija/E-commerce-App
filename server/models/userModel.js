const mongoose = require("mongoose");
const CheckEmail = require("email-validator");
const Password = require("password-validator");

const schema = new Password();
schema
  .is()
  .min(6)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(2)
  .has()
  .not()
  .spaces()
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"],"Please choose a stronger password!");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is mandatory!"],
  },
  password: {
    type: String,
    required: [true, "password is required!"],
    validate: [
      {
        validator: (value)=>{
          return schema.validate(value)} ,
        message: (msg)=>{
          return schema.validate(msg.value,{details:true})[0].message 
        },
      },
    ],
  },
  phoneNumber: {
    type: Number,
    required: [true],
    minlength: 10,
    maxlength: 10,
    unique: true,
  },
  address: {
    type: String,
    required: [true, "Address is required!"],
  },
  email: {
    type: String,
    unique: true,
    validate: [
      {
        validator: (value) => CheckEmail.validate(value),
        message: "Plese enter a valid email!",
      },
    ],
  },
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  ordersPending: {
    type: Array,
    default:[],
  },
  ordersCompleted: {
    type: Array,
    default:[],
  },
  ordersCanceled: {
    type: Array,
    default:[],
  },
  wishlist: {
    type: Array,
    default:[],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
