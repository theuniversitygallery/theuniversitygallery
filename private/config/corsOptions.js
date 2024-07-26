const cors = require('cors');
var whitelist = ['http://localhost:4500/','http://127.0.0.1:4500/', 'https://www.google.com/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin ) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  "optionsSuccessStatus": 204
}

module.exports = corsOptions;