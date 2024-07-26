const citizen = {
    users: require("./../models/citizen.json"),
    createCitizen: function (data) { this.users = data}
}
const fspromises = require("fs").promises;
const bcrypt = require("bcrypt")
const { matchedData,validationResult } = require("express-validator");
const path = require('path');
// check if citizenName already exist 
// check if cookies if last page visit  is set, if set redirect use to the page .


const registerNewUser = async (req, res)=>{
    let result = validationResult(req)
    if(!result.isEmpty()) return res.sendStatus(400).send({errors: result.array() })
    
    const data = matchedData(req);
    const {citizenName,citizenEmail,passCode,confirmPwd,status} = data;
    const filePath = path.join(__dirname,"..",'models',"citizen.json");

    try {        
        // check if the last inserted id 
        let lastID = citizen.users.length > 0 ? citizen.users[citizen.users.length - 1].citizenID : 0;
        lastID = (lastID === null || lastID === undefined ) ?  1 : lastID + 1;

        // check if status is company or student
        if (!(status === "company" || status === "student")) return res.sendStatus(409);
        // check if citizen name if duplicated
        const duplicate = citizen.users.find(member => member.citizenName == citizenName);
        if (duplicate) return res.sendStatus(409) // conflict
        // check passCode and hash it using bycrt
        
        if(passCode !== confirmPwd) return res.status(401).json({"message":" passcode dont match"});
        // since we have company and users , we need to a third model to hold their IDs.
        const hashedPwd = await bcrypt.hash(passCode,10);
        // json mockup 
        const citizenData = {
            "citizenID" : lastID, 
            citizenName, 
            citizenEmail,
            hashedPwd,
            status
        }
        //  //   when user create an account , check if status is student or company
        citizen.createCitizen([...citizen.users,citizenData]);
        // await fspromises.writeFile(filePath, JSON.stringify(data))
        await fspromises.writeFile(filePath,
            JSON.stringify(citizen.users)
        )
        // if the credentials have been saaved to DB, the start session
        // jwt start
        res.status(201).send(citizenData);
    }catch(err){
        console.error(err)
        res.sendStatus(401).json({ 'message': 'content was not uploaded' });    
    }
}

module.exports = {registerNewUser};