
// cross origin resource sharing
const allowedOrgins = require('./allowedOrigin');
// cors object
const corsOption ={
    origin: (origin,callback) => {
        if (allowedOrgins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }else{
            callback(new Error('NOT ALLOWED BY CORS'))
        }
    },
    optionSuccessStatus: 200
}

module.exports = corsOption;