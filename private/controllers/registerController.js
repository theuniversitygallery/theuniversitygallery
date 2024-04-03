// database
const userDB = {
    users : require("../models/userData.json"),
    setUsers : function (data) {this.users = data}

}
// save the data in json file 
const fsPromises = require("fs").promises;
const path = require('path');
// add bcrypt for the password security
const bcrypt = require('bcryptjs');


// validation forms
// const {isUserName,isEmailAddress,isTheSamePass} = require('../middleware/validateInput');

const userSignUp = async (req, res) => {
    const {username , email , passCode, reCode, userType} = req.body;
     // check if form fields are empty
    if (!username || !email || !passCode || !reCode || !userType) 
    return res.status(400).json({'message': 'fill in the form'});
// increase or monitor user id by adding one;
    const userID = {
        id: userDB.users?.length ?userDB.users[userDB.users.length - 1]._id + 1 : 1
    }

    
    // check if username contain special characters;
    
    // check if there is a duplicate
    const duplicate = userDB.users.find(person => person.username === username);
    if (duplicate) return res.sendStatus(409);
    /*
    // check if fields are not empty and it does not contain regular expression 
    if (!isEmailAddress(email)) {
        return res.status(400).json({ 'message': 'Enteer a valid email address' });
    }*/
    // check if password and retype password are the same
    if (passCode !== reCode) {
        return res.status(400).json({ 'message': 'password suppose to be the same' });
    }
    /**/
   try {
        // encrypt the password with bcrypt
        // Technique 1 (generate a salt and hash on separate function calls):
        const genSalt = await bcrypt.genSalt(10)
        const hashedPwd = await bcrypt.hash(passCode,genSalt);

        const newUser = {
            "_id":userID.id,
            "username": username,
            "email":email,
            "passCode":hashedPwd,
            "roles": {"user": 7070},
            "userType":userType
        };
        userDB.setUsers([...userDB.users, newUser]);
       // update the data base with the new user
        await fsPromises.writeFile(
            path.join(__dirname,'..','models','userData.json'),
            JSON.stringify(userDB.users)
        );
            console.log(userDB.users);
            res.status(201).json({'success': `New user ${username} created`})
    } catch (err) {
        res.status(500).json({'message': err.message , "simple":"no data recorded"});
    }

}

module.exports = {userSignUp}

