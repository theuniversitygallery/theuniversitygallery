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

const loginController = async(req,res) => {
    let result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).json({"message":"fill in the input with correct info"})
    
    const data = matchedData(req)
    const {citizenName,passCode} = data;

    if (!validateCitizenName(citizenName)) {
        return res.status(401).json({ message: "Invalid citizen name format" });
      }
      
    if (!citizenName || !passCode) return res.status(400).json({"message":"fill in the input with correct info"})
    
    try {
        // check if the citizen name contains @ if true is email so user can use email to sign up
        // check if to see if user exist
        const found = citizen.users.find(user => user.citizenName === citizenName);
        if (!found) return res.status(401).json({"message":"user not found this ID isnot correct"})
        
        const matched = await bcrypt.compare(passCode,found.hashedPwd);

        if (matched){ 
            const accessToken = jwt.sign(
                { "citizenName": found.citizenName },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '16m' }
            );
            const refreshToken = jwt.sign(
                { "citizenName": found.citizenName },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            // save refresh token with the current user.
            const otherUsers = citizen.users.filter(person => person.citizenName !== found.citizenName);
            const currentUser = {...found, refreshToken};
            citizen.createUser([...otherUsers,currentUser]);
            await fspromises.writeFile(
                path.join(__dirname,'..','models','citizen.json'), 
                JSON.stringify(citizen.users)
            );

            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
            res.cookie('loginTokenJwt', refreshToken, { 
                httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 
            });
            res.cookie('loginTokenJwt', refreshToken, {
                httpOnly: true,
                sameSite: 'Strict', // Adjust based on your requirements
                // secure: process.env.NODE_ENV === 'production', // Ensure secure is set to true if using HTTPS
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            });
            
            res.json({accessToken});    

        }else {
            return res.status(401).json({"error": "password is not correct" });
        }
        
    } catch (error) {
        res.status(500).json({"mgs":error.message})
    }

}

module.exports = loginController;