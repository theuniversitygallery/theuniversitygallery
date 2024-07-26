const citizen = {
    users: require("./../models/citizen.json"),
    createUser: function (data) { this.users = data}
}

const { matchedData,validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const validateCitizenName = require("../util/loginUtility");
const jwt = require('jsonwebtoken')
require('dotenv').config();
const fspromises = require("fs").promises;
const path = require('path');

const handleLogOut = async(req,res) => {
    const cookies = req.cookies;
    // change the jwt to something nice and easy to remember
    if(cookies?.loginTokenJwt) return res.sendStatus(204)
    const refreshToken = cookies.loginTokenJwt;
    
        // check if the citizen name contains @ if true is email so user can use email to sign up
        // check if to see if user exist
        const foundRefreshToken = citizen.users.find(user => user.refreshToken === refreshToken);
        if (!foundRefreshToken) {
            res.clearcookie('loginTokenJwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            return res.sendStatus("403");
        }
        // deleting refresh token from jsonDB 
        const otherUsers = citizen.users.filter(user => user.refreshToken !== foundRefreshToken.refreshToken )
        const currentUser = {...foundRefreshToken,refreshToken:''}

        citizen.createUser([...otherUsers, currentUser]);

        await fspromises.writeFile(
            path.join(__dirname, '..','models', 'citizen.json'),
            JSON.stringify(citizen.createUser)
        )

        res.clearcookie('loginTokenJwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.sendStatus(204)
}

module.exports = handleLogOut;