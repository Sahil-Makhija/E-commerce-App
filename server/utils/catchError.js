const Response = require("./Response");

const catchError = (func) => (req, res) => {
  Promise.resolve(func(req, res)).catch((error)=>{
    console.log(error);
    return new Response(res).InternalError(error.message)
  });
};

module.exports = catchError
