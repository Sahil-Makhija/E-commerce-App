const checkForAdmin = require('../utils/checkForAdmin');

const isAdmin = async (req,res,next) =>{
    const {admin_id} = req.cookies
    if (admin_id){
        if (await checkForAdmin(admin_id)){
            next()
        }
        else{
            res.end('you are not authenticated to access this source')
        }
    }
    else{
        res.end('login to access this page')
    }
}

module.exports = {isAdmin}