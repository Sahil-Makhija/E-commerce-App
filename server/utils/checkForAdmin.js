const Admin = require('../models/adminModel')

const checkForAdmin = async(admin_id) =>{
    const user_status =  await Admin.find({admin_id}).then((admin_data)=>{
        return admin_data === null ? false : true
    }).catch((err)=>{
        return false
    })
    return user_status
}

module.exports = checkForAdmin