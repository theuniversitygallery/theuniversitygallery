const { format } = require('date-fns');
const  {v4: uuid} = require('uuid');

//  log file 
const fs = require('fs');
const fspromises = require('fs').promises;
const path = require('path');

// creating a function to export
const logEvents = async function(message,logName) {
    // create date 
    const dateTime = `${format(new Date(), 'dd-mm-yyyy\thh:mm:ss')}`;
    // add message to date
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    // to write to a file using try and catch block
    try {
        if(!(fs.existsSync(path.join(__dirname,'..','logs')))){
           await fspromises.mkdir(path.join(__dirname,'..','logs'))
        }
        // await fspromises.appendFile(path.join(__dirname, 'logs','eventLog.txt'), logItem);
        await fspromises.appendFile(path.join(__dirname,'..','logs', logName),logItem);
    } catch (err) {
        console.log(err)
    } 

}
const logger = (req,res,next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt');
    next();
}
// export the function

module.exports = {logger, logEvents};