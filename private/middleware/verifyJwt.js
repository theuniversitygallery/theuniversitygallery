const jwt = require('jsonwebtoken');
require('dotenv').config();

/*
const verifyJWT = (req,res,next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,decode) =>{

        if(err) return res.sendStatus(4032)
            req.user = decode
            next();
     })   
}
*/

const verifyJWT = (req, res, next) => {
        const tokenFromCookies = req.cookies.loginTokenJwt
    
        const authHeader = req.headers.authorization;
        const tokenFromHeader = authHeader && authHeader.split(' ')[1];
        
        console.log('Token from Cookies:', tokenFromCookies);
        console.log('Token from Header:', tokenFromHeader);

        const token = tokenFromHeader || tokenFromCookies;

        if (!token) return res.sendStatus(401);
        console.log(authHeader); // Bearer token
        
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.sendStatus(403); //invalid token
                req.user = decoded.citizenName;
                next();
            }
    );
}

/*
const verifyJWT = (req, res, next) => {
    const tokenFromCookies = req.cookies.loginTokenJwt;
    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader && authHeader.split(' ')[1];
    const token = tokenFromHeader || tokenFromCookies;

    if (!token) return res.sendStatus(401);

    console.log('Token from Cookies:', tokenFromCookies);
    console.log('Token from Header:', tokenFromHeader);
    console.log('Token being verified:', token);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.sendStatus(403);
        }
        req.user = decoded.citizenName;
        next();
    });
};
*/
module.exports = verifyJWT