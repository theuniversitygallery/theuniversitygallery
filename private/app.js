const express = require("express");
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const path = require("path"); 
const {logEvent, logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const route = require('./routes/root');
const cookieParser = require("cookie-parser");
const session = require("express-session");
require('dotenv').config(); 
const sessionSetting = require('./middleware/sessionMiddleWare');

const PORT = process.env.PORT || 4500;
// middlewares
app.use(express.urlencoded({extended:false}));
app.use('/',express.static(path.join(__dirname,"/public"))); //static files
app.use('/company',express.static(path.join(__dirname,"/public"))); //static files

// using middleware to process post info
app.use(express.json());

app.use(cors(corsOptions)); // cross origin resource sharing
// request logger
app.use(logger);

app.use(cookieParser());
// app.use(session(sessionSetting));
app.use(route);

// serving page 404
app.all('*',(req,res)=>{
    res.status(404);
    if(req.accepts('json')){
        res.json({error:"404 not found"})
    }
});
app.use(errorHandler);
app.listen(PORT, ()=>{
    console.log('server running');
})