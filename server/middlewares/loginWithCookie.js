// import { findUser } from "../controllers/userControllers"
const {findUser} = require('../controllers/userControllers')
 const loginWithCookie = async(req,res,next) =>{
    if ({user_id} = req.cookies){
        let userQuery =  await findUser({user_id})
        if (userQuery === null){
            res.json({
                status : false,
                error : 'user not found'
            })
        }
        else if (userQuery.status === false ){
            res.json({
                status : false,
                error : 'error occured while feftching databse'
            })
        }
        else{
            res.json({
                status : true,
                userData : userQuery
            })
        }
        next()
    }
}

module.exports= {loginWithCookie}