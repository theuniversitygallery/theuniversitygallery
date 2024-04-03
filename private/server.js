const express = require("express");
const app = express();
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const corsOption = require('./config/corsOption');
const path = require('path');
const verifyJWT = require('./middleware/verifyJwt');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const { resource } = require("./routes/root");
const PORT = process.env.PORT || 3000;
 // cross origin resource sharing
// logger //middleware

app.use(logger);

app.use(credentials);

// cross origin resource sharing 
app.use(cors(corsOption));

// using middleware for urlencoder
app.use(express.urlencoded({extended: false}));

// build in middleware for json
app.use(express.json());
// middleware for cookie
app.use(cookieParser());
// serving static files
app.use('/',express.static(path.join(__dirname,'/public')))
// app.use('/company',express.static(path.join(__dirname,'/public')))



// route
app.use('/',require('./routes/root'));

app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh',require('./routes/refresh'));
app.use('/logout',require('./routes/logout'));

app.use(verifyJWT);
// app.use('/company', require('./routes/company'));
app.use('/newPost', require('./routes/api/company'));



// show 404 when page dont exist
app.all('*',(req,res) =>{
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'));
    }else if (req.accepts('json')) {
        res.json({error: "404 Not Found"});
    } else {
        res.type('txt').send('404 Not Found');
    }
})

app.use(errorHandler);

app.listen(PORT, ()=> console.log(`server running on port ${PORT}` ));