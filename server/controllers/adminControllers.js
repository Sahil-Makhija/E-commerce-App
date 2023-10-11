const Admin  = require("../models/adminModel")
const Response = require("../utils/Response")
const catchError = require("../utils/catchError")
const uuid = require('uuid').v4

const createAdmin = catchError(async(req,res)=>{
    const {adminName , adminPassword , authQuestion , authAnswer} = req.body
    const Res = new Response(res);
    let existing_admin = await Admin.findOne({adminName,adminPassword});
    if (existing_admin){
        return Res.Conflict("Admin with these credentials already exists!")
    }
    let newAdmin = Admin.create({adminName,adminPassword,authAnswer,authQuestion,admin_id:uuid()});
    return Res.Created({newAdmin});
})

const getAdminData = catchError(async(req,res)=>{
    const Res = new Response(res);
    const {admin_id,adminName,adminPassword} = req.body;
    let adminData = await Admin.findOne({$or:[{admin_id},{adminName,adminPassword}]});
    if (adminData){
        return Res.Found({adminData})
    }
    return Res.NotFound('No Admin user was found withn the given creadentials');
})

const getAuthQues = catchError(async(req,res)=>{
    const Res = new Response(res);
    const {adminName,adminPassword} = req.body;
    let {authQuestion} = await Admin.findOne({adminName,adminPassword}).select("authQuestion");
    if (authQuestion){
        return Res.Found({authQuestion});
    }
    return Res.NotFound("No Admin User found!")
})


module.exports = {createAdmin , getAdminData,getAuthQues}