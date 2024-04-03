const jwt = require('jsonwebtoken');
require('dotenv').config();


// after pass the refreshToken from auhContoller
// we need it on the page to make static without it the page wont progress to the next stage 
//  the verifyJWT will verify the refreshToken if correct then it return true then make use or page progress to the next page

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
}

module.exports = verifyJWT