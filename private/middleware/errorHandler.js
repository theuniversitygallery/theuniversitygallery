const {logEvents} = require('./logEvents');
const errorhandler = (err,req,res,next)=>{
    logEvents(`${err.name}\t${err.message}`, 'errLog.txt');
    res.status(500).send(err.message);
}

module.exports = errorhandler;