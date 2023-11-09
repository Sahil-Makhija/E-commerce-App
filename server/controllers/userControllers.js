const { User } = require("../models/userModel");
const Response = require("../utils/Response");
const catchError = require("../utils/catchError");
const uuid = require("uuid").v4;

const createUser = catchError(async (req, res) => {
  const Res = new Response(res);
  let existing_user = await User.findOne({
    $or: [{ phoneNumber: req.body.phoneNumber }, { email: req.body.email }],
  });
  if (existing_user) {
    return Res.Conflict(
      "User with this email-id or phone number already exists!"
    );
  }
  const newUser = await User.create({ ...req.body, user_id: uuid() }).then(
    (user) => {
      return User.findById(user._id).select("-password");
    }
  );
  return Res.Created({ newUser });
});

const loginUser = catchError(async (req, res) => {
  const Res = new Response(res);
  const { user_id } = req.cookies;
  let userData;
  if (user_id) {
    userData = await User.findOne({ user_id }).select("-password");
  }
  else{
    userData = await User.findOne({
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
    }).select("-password");
  }
  if (userData) {
    return Res.Found({ userData });
  }
  return Res.NotFound("User not found!");
});

//get All Users (data)
const getAllUsers = catchError(async (req, res) => {
  const Res = new Response(res);
  let users = await User.find();
  if (users) {
    return Res.Found({ users });
  }
  return Res.NotFound("No users found!");
});

const deleteUser = catchError(async (req, res) => {
  const Res = new Response(res);
  let { phoneNumber, password, email } = req.body;
  User.findOneAndDelete({ phoneNumber, email, password }).then(
    (deletedUser) => {
      if (deletedUser) {
        return Res.Deleted("User deleted successfully!");
      }
      return Res.NotFound("User not found!");
    }
  );
});

const updateUser = catchError(async (req, res) => {
  const Res = new Response(res);
  const { phoneNumber, password, email } = req.body.credentials;
  let updatedData = await User.findOneAndUpdate(
    { phoneNumber, password, email },
    req.body.newData
  );
  if (updatedData) {
    return Res.Updated({ updatedData });
  } else {
    return Res.NotFound("No matching entry found to update!");
  }
});

module.exports = {
  createUser,
  loginUser,
  deleteUser,
  updateUser,
  getAllUsers,
};
