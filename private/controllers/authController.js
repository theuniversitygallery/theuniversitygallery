/**
NOTE***
 The auth controllers also called the login auth
 1. connect to database 
 2. declare bcrypt for passCode harsh
 3 declare async function to check if user name and password is not empty
 inside the async function 
 - check if username  exist in the database
 - use bcrypt to decrypte the password and compare the user input and the database passCode
 - if it found redirect user to the explore page

*/
// database
const userDB = {
    users : require("../models/userData.json"),
    setUsers : function (data) {this.users = data}

}

// add bcrypt for the password encrypt | decryption
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const fsPromises = require('fs').promises;
const path = require('path');
const { send } = require("process");

// login handling 
const userLogin =  async (req, res) => {
    // const {username, passCode} = req.body;
    const {username,passCode} = req.body;
    console.log(`${username} - ${passCode}`)
    // check if there is an empty space
    if (!username || !passCode) return res.status(400).json({"message":"username and password require"});
    /*************
    // future check input one by one   */
    // check if username exist in the database
    const findUser = userDB.users.find(person => person.username === username);
    if(!findUser){
         return res.status(401).json({ "message": "Unauthorized: User not found." });
    }

    // compare password with database and decript it
    const match = await bcrypt.compare(passCode , findUser.passCode)
    if (match) {
        const roles = Object.values(findUser.roles);
        // jwt web token for session
        // define accesstoken
        const accessToken = jwt.sign(
            
            {
                "userInfo":{
                    "username": findUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "1h"}
        ) 
        const refreshToken = jwt.sign(
            // later use userID instead of username
            {"username": findUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: "1d"}
        ) 
        // save the token with the user credentials
        // get all users except current user
        const otherUser = userDB.users.filter(person => person.username !== findUser.username)
        // add the refresh token to the current user or foundUser using the spread operator 
        const currentUser = {...findUser,refreshToken};
        // add to the list of userDB;
        userDB.setUsers([...otherUser,currentUser]);
        // write it to the database with the refresh token
        await fsPromises.writeFile(
            path.join(__dirname,'..','models','userData.json'),
            JSON.stringify(userDB.users)
        );
        // if the refreshToken token get stores then store it in the cookies to give user access to pages
        res.cookie('jwt',refreshToken,{httpOnly: true, sameSite: 'None', secure:true,maxAge: 10*60*60*1000}) //10 hours
        // i am sending this code to the front end
        res.json({accessToken});
    } else {
        res.status(401).json({ "message": "Unauthorized: Incorrect password." });
    }

}



module.exports = {userLogin}