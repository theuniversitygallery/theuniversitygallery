
// database
const userDB = {
    users : require("../models/userData.json"),
    setUsers : function (data) {this.users = data}

}

const fsPromises = require('fs').promises;
const path = require('path')
// login handling 
const handleLogout =  async (req, res) => {
    // on client click log out delete accessToken .. front end code here

    const cookies = req.cookies;
//    check if cookies exist
    if (!cookies?.jwt) return res.sendStatus(204) // successful nut no content
        const refreshToken = cookies.jwt;
    
     // check if refreshToken exist in the db
        const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);
        if (!foundUser) {
            res.clearCookie('jwt',{httpOnly: true,sameSite:'None', secure:true})
        };
     
        const otherUsers = userDB.users.filter(person => person.refreshToken !== foundUser.refreshToken)
        const currentUser = {...foundUser, refreshToken: ""};
        users.setUsers([...otherUsers,foundUser]);

        await fsPromises.writeFile(
            path.join(__dirname, "..","models", "userData.json"),
            JSON.stringify(usersDB.userDB)
        )
        res.clearCookie('jwt',{httpOnly: true,sameSite:'None', secure:true})
        res.sendStatus(204)
}
module.exports = {handleLogout}