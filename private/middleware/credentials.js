const allowedOrgins = require('../config/allowedOrigin');

const credentials = (req,res,next) => {
    const origin = req.header.origin
    if(allowedOrgins.includes(origin)){
        res.header('Access-Control-Allow-credentials', true)
    }
    next();
}
module.exports = credentials;