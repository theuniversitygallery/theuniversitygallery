const citizen = {
    users: require("./../models/citizen.json"),
    createUser: function (data) { this.users = data}
}

const jwt = require('jsonwebtoken')
require('dotenv').config();


const handleRefreshToken = (req,res) => {
    const cookies = req.cookies;
    if (!cookies?.loginTokenJwt){
        return res.sendStatus(401); // unauthorize
    }
    console.log(cookies.loginTokenJwt);
    const refreshToken = cookies.loginTokenJwt;
    const foundUser = citizen.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.citizenName) return res.sendStatus(403);

            const accessToken = jwt.sign(
                { "citizenName": decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '16m' }
            );
            res.json({ accessToken })
        }
    );
}

module.exports = handleRefreshToken;